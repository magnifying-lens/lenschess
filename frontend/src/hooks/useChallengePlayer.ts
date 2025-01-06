import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";

export default function useChallengePlayer() {
  const { writeContract, isPending } = useWriteContract();

  const challengePlayer = useCallback((address: `0x${string}`) => {
    writeContract({
      abi: lensChessAbi,
      address: import.meta.env.VITE_LENSCHESS_ADDRESS,
      functionName: "challengePlayer",
      args: [address],
    });
  }, []);

  return { challengePlayer, isPending };
}
