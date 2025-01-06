import { Deployer } from "@matterlabs/hardhat-zksync";
import { deployTransparentProxy, getWallet, LOCAL_RICH_WALLETS } from "./utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Contract } from "ethers";
import { Square } from "chess.js";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { Wallet } from "zksync-ethers";

export function convertChessJsMoveTo16Bit(from: Square, to: Square): number {
  const fromFile = from.charCodeAt(0) - 97;
  const fromRank = parseInt(from.charAt(1)) - 1;
  const toFile = to.charCodeAt(0) - 97;
  const toRank = parseInt(to.charAt(1)) - 1;

  const fromPos = fromRank * 8 + fromFile;
  const toPos = toRank * 8 + toFile;

  return (fromPos << 6) | toPos;
}

export default async function (hre: HardhatRuntimeEnvironment) {
  let wallet1 = getWallet();

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet1);

  const chessArtifact = await deployer.loadArtifact("Chess");

  const chessContract = await deployer.deploy(chessArtifact);

  // Show the contract info.
  console.log(
    `${
      chessArtifact.contractName
    } was deployed to ${await chessContract.getAddress()}`
  );

  const lensChessArtifat = await deployer.loadArtifact("LensChess");

  const chessAddress = await chessContract.getAddress();

  const lensChess = await deployer.deploy(lensChessArtifat, []);

  await lensChess.initialize(chessAddress);

  // Show the contract info.
  console.log(
    `${
      lensChessArtifat.contractName
    } was deployed to ${await lensChess.getAddress()}`
  );
}
