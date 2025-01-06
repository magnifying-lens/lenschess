import React, { useState, useCallback } from "react";
import { List, Pagination, Box, Typography } from "@mui/material";
import useGetAllCreatedGames from "../../hooks/useGetAllCreatedGames";
import { useAccount } from "wagmi";
import MyGameEntry from "./MyGameEntry";
import { GameState } from "../../types";

const ITEMS_PER_PAGE = 6;

interface Props {
  selectedGameId: bigint | null;
  onSelectGame: (gameId: bigint) => void;
}

const MyGames = ({ onSelectGame, selectedGameId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { address } = useAccount();

  const { games, totalGames } = useGetAllCreatedGames({
    first: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
    filter: {
      or: [
        { player1: { equalTo: address?.toLowerCase() } },
        { player2: { equalTo: address?.toLowerCase() } },
      ],
      state: { equalTo: GameState.Active },
    },
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
        {games.length > 0 ? (
          games.map((game) => (
            <MyGameEntry
              key={game.id}
              game={game}
              onSelectGame={onSelectGame}
              selectedGameId={selectedGameId}
            />
          ))
        ) : (
          <Typography variant="h6" align="center">
            No active games available.
          </Typography>
        )}
      </List>
      <Pagination
        count={Math.ceil(totalGames / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={onPageChange}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
};

export default MyGames;
