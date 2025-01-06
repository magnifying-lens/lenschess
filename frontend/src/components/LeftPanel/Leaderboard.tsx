import React, { useCallback, useState, useMemo } from "react";
import {
  List,
  Pagination,
  Switch,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import useGetEloRatings from "../../hooks/useGetEloRatings";
import LeaderboardEntry from "./LeaderBoardEntry";
import { useAccount } from "wagmi";
import { EloRatingEventFilter } from "../../graphql/graphql";

const ITEMS_PER_PAGE = 6;

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMyRatings, setFilterMyRatings] = useState<boolean>(false);

  const { address } = useAccount();

  const filter = useMemo((): EloRatingEventFilter | undefined => {
    if (filterMyRatings && address !== undefined) {
      return { player: { equalTo: address.toLowerCase() } };
    }
    return undefined;
  }, [filterMyRatings, address]);

  const { ratings, totalPlayers } = useGetEloRatings({
    first: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
    filter,
    refetchInterval: 2000,
  });

  const onPageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterMyRatings(event.target.checked);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <FormControlLabel
          control={
            <Switch
              checked={filterMyRatings}
              onChange={handleFilterChange}
              name="myRatingsToggle"
            />
          }
          label="Show My Rating"
        />
      </Box>
      {ratings.length > 0 ? (
        <List>
          {ratings.map((rating) => (
            <LeaderboardEntry
              key={rating.address}
              player={rating}
              place={rating.placement}
            />
          ))}
        </List>
      ) : (
        <Typography variant="h6" align="center">
          No ratings available
        </Typography>
      )}
      <Pagination
        count={Math.ceil(totalPlayers / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={onPageChange}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
};

export default Leaderboard;
