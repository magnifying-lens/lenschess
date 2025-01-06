import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";

export default function useResign() {
  const { writeContract, isPending } = useWriteContract();

  const resign = useCallback((gameId: bigint) => {
    writeContract({
      abi: lensChessAbi,
      address: import.meta.env.VITE_LENSCHESS_ADDRESS,
      functionName: "resign",
      args: [gameId],
    });
  }, []);

  return { resign, isPending };
}
