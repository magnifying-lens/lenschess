// Utility function to shorten Ethereum addresses
export const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;