import React, { useState, useCallback } from "react";
import { List, Pagination, Box, Typography } from "@mui/material";
import useGetChallenges from "../../hooks/useGetChallenges";
import ChallengeEntry from "./ChallengeEntry";

const ITEMS_PER_PAGE = 6;

interface Props {
  onSelectGame: (gameId: bigint) => void;
}

const Challenges = ({ onSelectGame }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { challenges, totalChallenges } = useGetChallenges({
    first: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  });

  const onPageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    []
  );

  return (
    <>
      <Box mb={2}></Box>
      <List>
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeEntry
              key={challenge.gameId}
              challenge={challenge}
              onSelectGame={onSelectGame}
            />
          ))
        ) : (
          <Typography variant="h6" align="center">
            No challenges available.
          </Typography>
        )}
      </List>
      <Pagination
        count={Math.ceil(totalChallenges / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={onPageChange}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
};

export default Challenges;
