import { useEffect, useMemo } from "react";
import { lensChessAbi } from "../generated";
import { useReadContract } from "wagmi";
import { useBlockNumber } from "wagmi";
import { Game, GameState, Outcome } from "../types";

type Props = {
  gameId?: bigint;
};

export default function useGetCurrentGameState({ gameId }: Props) {
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data, isPending, refetch } = useReadContract({
    address: import.meta.env.VITE_LENSCHESS_ADDRESS,
    abi: lensChessAbi,
    functionName: "getGame",
    args: [gameId ?? BigInt(0)],
    query: {
      enabled: gameId !== undefined,
    },
  });

  useEffect(() => {
    // want to refetch every `n` block instead? use the modulo operator!
    // if (blockNumber % 5 === 0) refetch() // refetch every 5 blocks
    if (gameId !== undefined) refetch();
  }, [blockNumber, refetch, gameId]);

  const game = useMemo(
    (): Game | undefined =>
      data
        ? {
            id: data.id,
            state: data.state as GameState,
            fullMoves: data.fullMoves,
            halfMoveClock: data.halfMoveClock,
            isWhitePlayersTurn: data.isWhitePlayersTurn,
            outcome: data.outcome as Outcome,
            gameState: data.gameState,
            whiteState: data.whiteState,
            blackState: data.blackState,
            player1: data.player1,
            player2: data.player2,
            playerWhite: data.playerWhite,
            playerBlack: data.playerBlack,
            lastMoveTimestamp: data.lastMoveTimestamp * BigInt(1000),
            whiteOfferedDraw: data.whiteOfferedDraw,
            blackOfferedDraw: data.blackOfferedDraw,
            blackResigned: data.blackResigned,
            whiteResigned: data.whiteResigned,
          }
        : undefined,
    [data]
  );

  return { game, isPending };
}
