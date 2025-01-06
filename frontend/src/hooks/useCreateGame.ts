import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";

export default function useCreateGame() {
  const { writeContract, isPending } = useWriteContract();

  const createGame = useCallback(() => {
    writeContract({
      abi: lensChessAbi,
      address: import.meta.env.VITE_LENSCHESS_ADDRESS,
      functionName: "createGame",
    });
  }, []);

  return { createGame, isPending };
}
