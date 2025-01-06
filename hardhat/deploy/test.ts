import { Deployer } from "@matterlabs/hardhat-zksync";
import { deployTransparentProxy, getWallet } from "./utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Contract } from "ethers";

export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet();

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);

  const artifact = await deployer.loadArtifact("Test");

  const contract = await deployer.deploy(artifact);
  console.log({address: await contract.getAddress()})

  await contract.test();
}
