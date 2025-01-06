import { graphql } from "../graphql";

import { useCustomQuery } from "../graphql/execute";
import { useMemo } from "react";
import useGetGameStates from "./useGetGameStates";
import { GameEventFilter } from "../graphql/graphql";

const GetAllCreatedGamesQuery = graphql(`
  query GetGames($first: Int, $offset: Int, $filter: GameEventFilter) {
    getLatestGameEvents(first: $first, offset: $offset, filter: $filter) {
      nodes {
        gameId
        player1
        player2
      }
      totalCount
    }
  }
`);

/*
CREATE OR REPLACE FUNCTION lenschessindexer_lens_chess.get_latest_game_events()
RETURNS SETOF lenschessindexer_lens_chess.game_event AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (gamed_id) *
    FROM lenschessindexer_lens_chess.game_event
    ORDER BY gamed_id, block_number DESC;
END;$$ LANGUAGE plpgsql STABLE;
*/

type Props = {
  first?: number;
  offset?: number;
  filter?: GameEventFilter;
};

export default function useGetAllCreatedGames({
  first = 10,
  offset = undefined,
  filter,
}: Props = {}) {
  const { data } = useCustomQuery(
    GetAllCreatedGamesQuery,
    {
      first,
      offset,
      filter,
    },
    { refetchInterval: 2000 }
  );

  const gameIds = useMemo(
    () =>
      data?.getLatestGameEvents?.nodes.map((n) => BigInt(n?.gameId ?? 0)) ?? [],
    [data]
  );

  const { games } = useGetGameStates({ gameIds });

  return { games, totalGames: data?.getLatestGameEvents?.totalCount ?? 0 };
}
