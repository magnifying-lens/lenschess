import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../hardhat",
      artifacts: "artifacts-zk",
      deployments: {
        LensChess: {
          1: "0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe",
        },
      },
    }),
    react(),
  ],
});
