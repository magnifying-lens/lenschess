import { expect } from "chai";
import * as hre from "hardhat";
import { Provider, type Contract, Wallet } from "zksync-ethers";
import { getWallet, LOCAL_RICH_WALLETS, deployContract } from "../deploy/utils";
import { ContractTransactionResponse } from "ethers";
import { Deployer } from "@matterlabs/hardhat-zksync";
import { ZkSyncArtifact } from "@matterlabs/hardhat-zksync-deploy/dist/types";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Greeter", function () {
  let provider: Provider;
  let deployer: Deployer;
  let chessArtifact: ZkSyncArtifact;
  let lensChessArtifact: ZkSyncArtifact;
  let chess: Contract;
  let lensChess: Contract;
  let wallet1: Wallet;
  let wallet2: Wallet;

  before(async function () {
    // Creation of a provider from a network URL adjusted specifically for the ZKsync Era Test Node.
    provider = new Provider(hre.network.config.url);
    // To ensure proper testing, we need to deploy our contract on the ZKsync Era Test Node, for more info check hardhat-zksync-deploy plugin documentation.
    deployer = new Deployer(hre, new Wallet(LOCAL_RICH_WALLETS[0].privateKey));
    wallet1 = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
    wallet2 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)
    chessArtifact = await deployer.loadArtifact("Chess");
    chess = await deployer.deploy(chessArtifact, []);
    lensChessArtifact = await deployer.loadArtifact("LensChess");
    lensChess = await deployer.deploy(lensChessArtifact, []);
    await lensChess.initialize(chess.getAddress());
  });
  it("should work on Era Test node", async function () {
    const netVersion = await provider.send("net_version", []);
    expect(netVersion === 260);
  });
  it("is deployed address valid", async function () {
    expect(await lensChess.getAddress()).to.be.properAddress;
  });
  it("create game id 0", async function () {
    expect(await lensChess.connect(wallet1).createGame()).to.emit(lensChess, "GameCreated").withArgs(0, wallet1.address);
  });
  it("create game id 1", async function () {
    expect(await lensChess.connect(wallet2).createGame()).to.emit(lensChess, "GameCreated").withArgs(1, wallet2.address);
  });
  it("join game", async function () {
    // Set the timestamp to an even number
    await time.setNextBlockTimestamp(1100);

    await expect(lensChess.connect(wallet2).joinGame(0))
      .to.emit(lensChess, "PlayerJoined")
      .withArgs(0, wallet2.address)
      .to.emit(lensChess, "GameStarted")
      .withArgs(0, wallet1.address, wallet2.address);
    
    // Set the timestamp to an odd number
    await time.setNextBlockTimestamp(1103);
    await expect(lensChess.connect(wallet1).joinGame(1))
      .to.emit(lensChess, "PlayerJoined")
      .withArgs(1, wallet1.address)
      .to.emit(lensChess, "GameStarted")
      .withArgs(1, wallet1.address, wallet2.address);
    });
  it("move", async function () {
    // await chess.pieceUnderAttack(BigInt("0xe000000003000000002000000000000000000000000000000000000000000000"), 0x3f)

    await lensChess.connect(wallet1).makeMove(0, 0x210);

    // await chess.verifyExecuteMove(BigInt("0xcbaedabc99999999000000000000000000000000000000001111111143265234"),
    //   0x210,
    //   0x000704ff,
    //   0x383f3cff,
    //   false)

    // await chess.connect(wallet1)
    //   .checkGame(
    //       BigInt("0xcbaedabc99999999000000000000000000000000000000001111111143265234"),
    //       0x000704ff,
    //       0x383f3cff,
    //       false,
    //       [0x210]
    //   )
    // expect(await lensChess.connect(wallet1).makeMove(0, 0x210))
    // expect(await lensChess.connect(wallet1).makeMove(0, 0x210)).to.throw()
    // expect(await lensChess.connect(wallet2).makeMove(0, 0x210))
  });
});
