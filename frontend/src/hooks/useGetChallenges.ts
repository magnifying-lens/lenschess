import { graphql } from "../graphql";

import { useCustomQuery } from "../graphql/execute";
import { useMemo } from "react";
import useGetEloRatings from "./useGetEloRatings";
import { useAccount } from "wagmi";
import { Challenge, GameState } from "../types";
import { Address } from "viem";

const GetChallengesQuery = graphql(`
  query GetChallenges($first: Int, $offset: Int, $filter: GameEventFilter) {
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

type Props = {
  first?: number;
  offset?: number;
};

export default function useGetChallenges({
  first = 10,
  offset = undefined,
}: Props = {}) {
  const { address } = useAccount();

  const { data } = useCustomQuery(
    GetChallengesQuery,
    {
      first,
      offset,
      filter: {
        player2: { equalTo: address?.toLowerCase() },
        state: { equalTo: GameState.PlayerChallenged },
      },
    },
    { refetchInterval: 2000, skip: address === undefined }
  );

  const players = useMemo(
    () =>
      data?.getLatestGameEvents?.nodes.flatMap((n) =>
        n?.player1 ? n.player1 : []
      ) ?? [],
    [data]
  );

  const ratings = useGetEloRatings({
    first,
    filter: { player: { in: players } },
  });

  const challenges: Challenge[] = useMemo((): Challenge[] => {
    if (!data || !ratings?.ratings) return [];
    return (
      data.getLatestGameEvents?.nodes.map((node): Challenge => {
        const player1Rating = ratings.ratings.find(
          (r) => r.address === node?.player1
        );
        return {
          gameId: BigInt(node?.gameId ?? 0),
          player1: node?.player1 as Address,
          player2: node?.player2 as Address,
          player1Rating: player1Rating ? player1Rating.eloRating : 0,
        };
      }) ?? []
    );
  }, [data, ratings]);

  return {
    challenges,
    totalChallenges: data?.getLatestGameEvents?.totalCount ?? 0,
  };
}
