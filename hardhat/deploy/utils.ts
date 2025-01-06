import { Provider, Wallet } from "zksync-ethers";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from "dotenv";
import { ethers } from "ethers";

import "@matterlabs/hardhat-zksync-node/dist/type-extensions";
import "@matterlabs/hardhat-zksync-verify/dist/src/type-extensions";

import { HardhatRuntimeEnvironment } from "hardhat/types";

// Load env file
dotenv.config();

type DeployContractOptions = {
  /**
   * If true, the deployment process will not print any logs
   *
   * @default false
   */
  silent?: boolean;
  /**
   * If true, the contract will be verified on Block Explorer,
   * provided that the network has a verification URL.
   *
   * @default false
   */
  verify?: boolean;
  /**
   * If specified, the contract will be deployed using this wallet
   *
   * @default Wallet instance from PRIVATE_KEY env variable
   */
  wallet?: Wallet;
  /**
   * If specified, the contract will be deployed using this Hardhat Runtime Environment
   *
   * @default `hre` global variable
   */
  hre?: HardhatRuntimeEnvironment;
};

type RequiredDeployContractOptions = Required<DeployContractOptions>;

export const getProvider = () => {
  const rpcUrl = hre.network.config.url;
  if (!rpcUrl)
    throw `⛔️ RPC URL wasn't found in "${hre.network.name}"! Please add a "url" field to the network config in hardhat.config.ts`;

  // Initialize zkSync Provider
  const provider = new Provider(rpcUrl);

  return provider;
};

export const getWallet = (privateKey?: string) => {
  if (!privateKey) {
    // Get wallet private key from .env file
    if (!process.env.PRIVATE_KEY) {
      const wallet = Wallet.createRandom();
      console.log({ privateKey: wallet.privateKey, address: wallet.address });
      process.env.PRIVATE_KEY = wallet.privateKey;
    }
  }

  const provider = getProvider();

  // Initialize zkSync Wallet
  const wallet = new Wallet(privateKey ?? process.env.PRIVATE_KEY!, provider);

  return wallet;
};

export const verifyEnoughBalance = async (wallet: Wallet, amount: bigint) => {
  // Check if the wallet has enough balance
  const balance = await wallet.getBalance();
  if (balance < amount)
    throw `⛔️ Wallet balance is too low! Required ${ethers.formatEther(
      amount
    )} ETH, but current ${wallet.address} balance is ${ethers.formatEther(
      balance
    )} ETH`;
};

/**
 * @param {string} data.contract The contract's path and name. E.g., "contracts/Greeter.sol:Greeter"
 */
export const verifyContract = async (data: {
  address: string;
  contract: string;
  constructorArguments: string;
  bytecode: string;
}) => {
  const verificationRequestId: number = await hre.run("verify:verify", {
    ...data,
    noCompile: true,
  });
  return verificationRequestId;
};

const createDeploymentLogger = (options: RequiredDeployContractOptions) => {
  return (message: string) => {
    if (options.silent) {
      return;
    }
    console.log(message);
  };
};

type Logger = ReturnType<typeof createDeploymentLogger>;

const resolveWallet = (options: RequiredDeployContractOptions) => {
  return options?.wallet ?? getWallet();
};

const loadArtifact = async (
  deployer: Deployer,
  contractArtifactName: string
) => {
  return await deployer.loadArtifact(contractArtifactName).catch((error) => {
    if (
      error?.message?.includes(
        `Artifact for contract "${contractArtifactName}" not found.`
      )
    ) {
      console.error(error.message);
      throw `⛔️ Please make sure you have compiled your contracts or specified the correct contract name!`;
    } else {
      throw error;
    }
  });
};

function defaultOptions(
  options?: DeployContractOptions
): RequiredDeployContractOptions {
  return {
    silent: false,
    verify: false,
    wallet: getWallet(),
    hre: hre,
    ...options,
  };
}

export const deployContract = async (
  contractArtifactName: string,
  constructorArguments: any[],
  opts?: DeployContractOptions
) => {
  const options = defaultOptions(opts);
  const log = createDeploymentLogger(options);

  log(`\nStarting deployment process of "${contractArtifactName}"...`);

  const wallet = resolveWallet(options);
  const deployer = new Deployer(hre, wallet);
  const artifact = await loadArtifact(deployer, contractArtifactName);

  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(
    artifact,
    constructorArguments
  );
  log(`Estimated deployment cost: ${ethers.formatEther(deploymentFee)} ETH`);

  // Check if the wallet has enough balance
  await verifyEnoughBalance(wallet, deploymentFee);

  // Deploy the contract to zkSync
  const contract = await deployer.deploy(artifact, constructorArguments);
  const address = await contract.getAddress();
  const constructorArgs = contract.interface.encodeDeploy(constructorArguments);
  const fullContractSource = `${artifact.sourceName}:${artifact.contractName}`;

  // Display contract deployment info
  log(`\n"${artifact.contractName}" was successfully deployed:`);
  log(` - Contract address: ${address}`);
  log(` - Contract source: ${fullContractSource}`);
  log(` - Encoded constructor arguments: ${constructorArgs}\n`);

  if (options.verify && hre.network.config.verifyURL) {
    log(`Requesting contract verification...`);
    await verifyContract({
      address,
      contract: fullContractSource,
      constructorArguments: constructorArgs,
      bytecode: artifact.bytecode,
    });
  }

  return contract;
};

export const deployTransparentProxy = async (
  contractArtifactName: string,
  constructorArguments: any[],
  opts?: DeployContractOptions
) => {
  const options = defaultOptions(opts);
  const log = createDeploymentLogger(options);

  log(`\nStarting deployment process of "${contractArtifactName}"...`);

  const wallet = resolveWallet(options);
  const deployer = new Deployer(hre, wallet);

  const artifact = await loadArtifact(deployer, contractArtifactName);

  // Gas estimation disabled until the hardhat-zksync-upgradable plugin supports custom chain IDs
  // https://github.com/matter-labs/hardhat-zksync/blob/main/packages/hardhat-zksync-upgradable/src/gas-estimation/estimate-gas-proxy.ts#L62

  // // Estimate proxy contract deployment fee
  // const deploymentFee = await hre.zkUpgrades.estimation.estimateGasProxy(
  //   deployer,
  //   artifact,
  //   constructorArguments,
  //   {
  //     kind: "transparent",
  //   },
  //   options.silent
  // );
  // log(`Estimated deployment cost: ${ethers.formatEther(deploymentFee)} ETH`);

  // // Check if the wallet has enough balance
  // await verifyEnoughBalance(wallet, deploymentFee);

  // Deploy the contract using a transparent proxy
  const crowdfunding = await hre.zkUpgrades.deployProxy(
    wallet,
    artifact,
    constructorArguments,
    {
      initializer: "initialize",
    },
    options.silent
  );

  const contract = await crowdfunding.waitForDeployment();

  const address = await contract.getAddress();
  const initializationArgs = contract.interface.encodeFunctionData(
    "initialize",
    constructorArguments
  );
  const fullContractSource = `${artifact.sourceName}:${artifact.contractName}`;

  // Display contract deployment info
  log(`\n"${artifact.contractName}" was successfully deployed:`);
  log(` - Contract address: ${address}`);
  log(` - Contract source: ${fullContractSource}`);
  log(` - Encoded initialization arguments: ${initializationArgs}\n`);

  if (options.verify && hre.network.config.verifyURL) {
    log(`Requesting contract verification...`);
    await verifyContract({
      address,
      contract: fullContractSource,
      constructorArguments: "0x", // Transparent proxy doesn't have constructor arguments
      bytecode: artifact.bytecode,
    });
  }

  return contract;
};

export const upgradeTransparentProxy = async (
  contractArtifactName: string,
  proxyAddress: string,
  opts?: DeployContractOptions
) => {
  const options = defaultOptions(opts);
  const log = createDeploymentLogger(options);

  log(`\nStarting upgrade process of "${contractArtifactName}"...`);

  const wallet = resolveWallet(options);
  const deployer = new Deployer(hre, wallet);

  const artifact = await loadArtifact(deployer, contractArtifactName);

  return hre.zkUpgrades.upgradeProxy(
    deployer.zkWallet,
    proxyAddress,
    artifact,
    {},
    options.silent
  );
};


/**
 * Rich wallets can be used for testing purposes.
 * Available on zkSync In-memory node and Dockerized node.
 */
export const LOCAL_RICH_WALLETS = [
  {
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    privateKey:
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    privateKey:
      "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  },
  {
    address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    privateKey:
      "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
  },
  {
    address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    privateKey:
      "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
  },
  {
    address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    privateKey:
      "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
  },
  {
    address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    privateKey:
      "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba",
  },
  {
    address: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    privateKey:
      "0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e",
  },
  {
    address: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    privateKey:
      "0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356",
  },
  {
    address: "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    privateKey:
      "0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97",
  },
  {
    address: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    privateKey:
      "0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6",
  },
];
