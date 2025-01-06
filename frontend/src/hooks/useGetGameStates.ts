import { useEffect, useMemo } from "react";
import { lensChessAbi } from "../generated";
import { useBlockNumber } from "wagmi";
import { useReadContracts } from "wagmi";
import { Game, GameState, Outcome } from "../types";

type Props = {
  gameIds: bigint[];
};

export default function useGetGameStates({ gameIds }: Props) {
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const contracts = useMemo(
    () =>
      gameIds.map(
        (gameId) =>
          ({
            address: import.meta.env.VITE_LENSCHESS_ADDRESS,
            abi: lensChessAbi,
            functionName: "getGame",
            args: [gameId],
          }) as const
      ),
    [gameIds]
  );

  const { data, isPending, refetch } = useReadContracts({
    contracts,
    query: {
      enabled: gameIds.length > 0,
    },
  });

  const games: Game[] = useMemo(
    () =>
      (data || [])
        .map((game): Game | null =>
          game.result
            ? {
                id: game.result.id,
                state: game.result.state as GameState,
                fullMoves: game.result.fullMoves,
                halfMoveClock: game.result.halfMoveClock,
                isWhitePlayersTurn: game.result.isWhitePlayersTurn,
                outcome: game.result.outcome as Outcome,
                gameState: game.result.gameState,
                whiteState: game.result.whiteState,
                blackState: game.result.blackState,
                player1: game.result.player1,
                player2: game.result.player2,
                playerWhite: game.result.playerWhite,
                playerBlack: game.result.playerBlack,
                lastMoveTimestamp: game.result.lastMoveTimestamp,
                whiteOfferedDraw: game.result.whiteOfferedDraw,
                blackOfferedDraw: game.result.blackOfferedDraw,
                blackResigned: game.result.blackResigned,
                whiteResigned: game.result.whiteResigned,
              }
            : null
        ) // Return `null` for games you want to exclude.
        .filter((game): game is Game => game !== null)
        .sort((a, b) => {
          if (a.state === GameState.Active && b.state === GameState.Created)
            return -1;
          if (a.state === GameState.Created && b.state === GameState.Active)
            return 1;
          return 0;
        }), // Filter out `null` values, narrowing them down to `Game`.
    [data]
  );

  useEffect(() => {
    // want to refetch every `n` block instead? use the modulo operator!
    // if (blockNumber % 5 === 0) refetch() // refetch every 5 blocks
    refetch();
  }, [blockNumber, refetch]);

  return { games, isPending };
}
