import { Deployer } from "@matterlabs/hardhat-zksync";
import { deployTransparentProxy, getWallet, LOCAL_RICH_WALLETS } from "./utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Contract } from "ethers";

export default async function (hre: HardhatRuntimeEnvironment) {

  const wallet1 = getWallet();
  const wallet2 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet1);

  const chessArtifact = await deployer.loadArtifact("Chess");

  const chessContract = await deployer.deploy(chessArtifact);

  console.log({chess: await chessContract.getAddress()});

  await chessContract.verifyExecuteMove(BigInt("0xcbaedabc99999999000000000000000000000000000000001111111143265234"), 0x210, 0x000704ff, 0x383f3cff, false);
  console.log("checkGame:")
  const result = await chessContract.checkGame(BigInt("0xcbaedabc99999999000000000000000000000000000000001111111143265234"), 0x000704ff, 0x383f3cff, false, [0x210]);

  console.log({result});
}
