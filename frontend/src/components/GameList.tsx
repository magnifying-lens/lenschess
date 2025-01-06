import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  List,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Box,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import useGetAllCreatedGames from "../hooks/useGetAllCreatedGames";
import { Game, GameState } from "../types";
import ActiveGameElement from "./ActiveGame";
import GameDetails from "./GameInfoDialog";
import { GameEventFilter } from "../graphql/graphql";
import { useAccount } from "wagmi";
import MyGameEntry from "./LeftPanel/MyGameEntry";

interface GameListProps {
  selectedGameId: bigint | null;
  onSelectGame: (gameId: bigint) => void;
}

const ITEMS_PER_PAGE = 6;

const gameStateMap: { [key: string]: GameState } = {
  Created: GameState.Created,
  PlayerChallenged: GameState.PlayerChallenged,
  Active: GameState.Active,
  Finished: GameState.Finished,
};

const GameList = ({ selectedGameId, onSelectGame }: GameListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsForGame, setShowDetailsForGame] = useState<Game | null>(
    null
  );
  const [filterMyGames, setFilterMyGames] = useState<boolean>(false);
  const [selectedGameState, setSelectedGameState] = useState<string>("All");

  const account = useAccount();
  const myAddress = account.address;

  const filter: GameEventFilter = useMemo((): GameEventFilter => {
    let filter: GameEventFilter = {
      state: { in: [GameState.Created, GameState.Finished, GameState.Active] },
    };
    if (filterMyGames) {
      filter = {};
      filter.or = [
        { player1: { equalTo: myAddress?.toLowerCase() } },
        { player2: { equalTo: myAddress?.toLowerCase() } },
      ];
    }
    if (selectedGameState !== "All") {
      if (filter === undefined) {
        filter = {};
      }
      filter.state = { equalTo: gameStateMap[selectedGameState] as GameState };
    }
    return filter;
  }, [filterMyGames, myAddress, selectedGameState]);

  useEffect(() => setCurrentPage(1), [filter]);

  const { games, totalGames } = useGetAllCreatedGames({
    first: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
    filter,
  });

  const onPageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    []
  );

  const handleShowGameDetails = useCallback((game: Game) => {
    setShowDetailsForGame(game);
  }, []);

  const handleClose = useCallback(() => {
    setShowDetailsForGame(null);
  }, []);

  const handleGameStateChange = (
    event: SelectChangeEvent<string>,
    _child: ReactNode
  ) => {
    setSelectedGameState(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterMyGames(event.target.checked);
  };

  return (
    <>
      {showDetailsForGame && (
        <GameDetails
          game={showDetailsForGame}
          open={showDetailsForGame !== null}
          handleClose={handleClose}
        />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter By State</InputLabel>
          <Select
            value={selectedGameState}
            onChange={handleGameStateChange}
            label="Filter By State"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Created">Joinable</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Finished">Finished</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={filterMyGames}
              onChange={handleFilterChange}
              name="myGamesToggle"
            />
          }
          label="My Games"
        />
      </Box>

      <List>
        {games.length > 0 ? (
          games.map((game) => {
            if (
              game.state === GameState.Active &&
              (game.player1 === myAddress || game.player2 === myAddress)
            ) {
              return (
                <MyGameEntry
                  key={game.id}
                  game={game}
                  selectedGameId={selectedGameId}
                  onSelectGame={onSelectGame}
                />
              );
            }
            return (
              <ActiveGameElement
                key={game.id}
                game={game}
                selectedGameId={selectedGameId}
                onSelectGame={onSelectGame}
                onShowGameDetails={handleShowGameDetails}
              />
            );
          })
        ) : (
          <Typography variant="body1" color="textSecondary" textAlign="center">
            No games found.
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

export default GameList;
