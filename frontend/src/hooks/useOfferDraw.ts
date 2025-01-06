import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";

export default function useOfferDraw() {
  const { writeContract, isPending } = useWriteContract();

  const offerDraw = useCallback((gameId: bigint) => {
    writeContract({
      abi: lensChessAbi,
      address: import.meta.env.VITE_LENSCHESS_ADDRESS,
      functionName: "offerDraw",
      args: [gameId],
    });
  }, []);

  return { offerDraw, isPending };
}
