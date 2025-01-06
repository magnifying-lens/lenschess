import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";

export default function useConcludeDraw() {
  const { writeContract, isPending } = useWriteContract();

  const concludeDraw = useCallback((gameId: bigint, accept: boolean) => {
    writeContract({
      abi: lensChessAbi,
      address: import.meta.env.VITE_LENSCHESS_ADDRESS,
      functionName: "concludeDraw",
      args: [gameId, accept],
    });
  }, []);

  return { concludeDraw, isPending };
}
