import { defineChain } from "viem";
import { http, createConfig, WagmiProvider } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const anvil = /*#__PURE__*/ defineChain({
  id: 260,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8011"],
      webSocket: ["ws://127.0.0.1:8011"],
    },
  },
});

export const lensTestnet = defineChain({
  id: 37111,
  name: "Lens Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lens.dev"],
    },
  },
  blockExplorers: {
    default: {
      name: "Lens Testnet Explorer",
      url: "https://block-explorer.testnet.lens.dev/",
    },
  },
  features: {
    zksync: true,
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [process.env.NODE_ENV === "development" ? anvil : lensTestnet],
    transports: {
      [process.env.NODE_ENV === "development" ? anvil.id : lensTestnet.id]:
        process.env.NODE_ENV === "development"
          ? http("http://127.0.0.1:8011")
          : http("https://rpc.testnet.lens.dev"),
    },
    // Required API Keys
    walletConnectProjectId: "a8276469cf8bfb00a9d8750fefffd535",

    // Required App Info
    appName: "LensChess",

    // Optional App Info
    appDescription: "Social Chess - On-Chain",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

// @ts-ignore
export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
