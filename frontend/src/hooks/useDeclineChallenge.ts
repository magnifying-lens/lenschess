import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";

export default function useDeclineChallenge() {
  const { writeContract, isPending } = useWriteContract();

  const declineChallenge = useCallback((gameId: bigint) => {
    writeContract({
      abi: lensChessAbi,
      address: import.meta.env.VITE_LENSCHESS_ADDRESS,
      functionName: "declineChallenge",
      args: [gameId],
    });
  }, []);

  return { declineChallenge, isPending };
}
