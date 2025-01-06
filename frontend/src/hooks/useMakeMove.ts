import { ShortMove } from "chess.js";
import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";
import { convertChessJsMoveTo16Bit } from "../chess-util";

export default function useMakeMove() {
  const { writeContract, isPending } = useWriteContract();

  const makeMove = useCallback((gameId: bigint, move: ShortMove) => {
    const m = convertChessJsMoveTo16Bit(move);

    // const fromPos = (m >> 6) & 0x3f;
    // const toPos = m & 0x3f;

    // const moveExtra = m >> 12;

    // console.log({ move: m, fromPos, toPos, moveExtra });

    writeContract({
      abi: lensChessAbi,
      address: import.meta.env.VITE_LENSCHESS_ADDRESS,
      functionName: "makeMove",
      args: [gameId, m],
    });
  }, []);

  return { makeMove, isPending };
}
