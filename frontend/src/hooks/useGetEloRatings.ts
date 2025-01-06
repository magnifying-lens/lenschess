import { graphql } from "../graphql";
import { useCustomQuery } from "../graphql/execute";
import { useMemo } from "react";
import { EloRatingWithPlacementFilter } from "../graphql/graphql";
import { Player } from "../types";
import { Address } from "viem";

const GetEloRatingsDescQuery = graphql(`
  query GetEloRatings(
    $first: Int
    $offset: Int
    $filter: EloRatingWithPlacementFilter
  ) {
    getLatestEloRatingsWithPlacement(
      first: $first
      offset: $offset
      filter: $filter
    ) {
      nodes {
        player
        rating
        placement
      }
      totalCount
    }
  }
`);

type Props = {
  first?: number;
  offset?: number;
  filter?: EloRatingWithPlacementFilter;
  refetchInterval?: number;
};

export default function useGetEloRatings({
  first = 10,
  offset,
  filter,
  refetchInterval,
}: Props = {}) {
  const { data } = useCustomQuery(
    GetEloRatingsDescQuery,
    {
      first,
      offset,
      filter,
    },
    refetchInterval ? { refetchInterval } : undefined
  );

  const ratings: Player[] = useMemo(() => {
    return (
      data?.getLatestEloRatingsWithPlacement?.nodes
        ?.filter(
          (n): n is { player: Address; rating: string; placement: number } =>
            n !== null && n?.player !== undefined
        )
        .map((n) => ({
          address: n.player,
          eloRating: n.rating ? Math.round(Number(n.rating) / 1e18) : 0,
          placement: n.placement,
        })) ?? []
    );
  }, [data]);

  const totalCount = data?.getLatestEloRatingsWithPlacement?.totalCount;
  return { ratings, totalPlayers: totalCount ?? 0 };
}
