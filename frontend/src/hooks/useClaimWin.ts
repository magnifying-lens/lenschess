import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";

export default function useClaimWin() {
  const { writeContract, isPending } = useWriteContract();

  const claimWin = useCallback((gameId: bigint) => {
    writeContract({
      abi: lensChessAbi,
      address: import.meta.env.VITE_LENSCHESS_ADDRESS,
      functionName: "claimWin",
      args: [gameId],
    });
  }, []);

  return { claimWin, isPending };
}
