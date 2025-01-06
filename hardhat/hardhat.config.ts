import "@matterlabs/hardhat-zksync";
import "@nomicfoundation/hardhat-toolbox";
import "@matterlabs/hardhat-zksync-verify";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",

  zksolc: {
    version: "latest",
    settings: {},
  },

  networks: {
    anvilZKsync: {
      url: "http://127.0.0.1:8011",
      ethNetwork: "localhost", // in-memory node doesn't support eth node; removing this line will cause an error
      zksync: true,
      accounts: process.env.WALLET_PRIVATE_KEY
        ? [process.env.WALLET_PRIVATE_KEY]
        : [],
    },
    lensTestnet: {
      chainId: 37111,
      ethNetwork: "sepolia",
      url: "https://rpc.testnet.lens.dev",
      verifyURL:
        "https://block-explorer-verify.testnet.lens.dev/contract_verification",
      zksync: true,
    },
    virtual_lens_testnet: {
      ethNetwork: "sepolia",
      url: "https://virtual.lens-sepolia.rpc.tenderly.co/d8308a18-56ef-416a-b5ad-12f29f4f3db6",
      chainId: 37111,
      zksync: true,
    },

    hardhat: {
      zksync: true,
    },
  },
};

export default config;
