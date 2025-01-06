import {
  ListItem,
  Box,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useAccount } from "wagmi";
import { Game, GameState } from "../types";
import { shortenAddress } from "../util";
import useJoinGame from "../hooks/useJoinGame";
import { useCallback } from "react";

interface Props {
  game: Game;
  selectedGameId: bigint | null;
  onShowGameDetails: (game: Game) => void;
  onSelectGame: (gameId: bigint) => void;
}

export default function ActiveGameElement({
  game,
  selectedGameId,
  onSelectGame,
  onShowGameDetails,
}: Props) {
  const { address, isConnected } = useAccount();
  const myGame =
    address?.toLowerCase() === game.player1.toLowerCase() ||
    address === game.player2.toLowerCase();
  const isSelected = game.id === selectedGameId;

  const onJoinSuccess = useCallback(
    (gameId: bigint) => {
      onSelectGame(gameId);
    },
    [onSelectGame]
  );

  const { joinGame, isPending: joinGamePending } = useJoinGame({
    onSuccess: onJoinSuccess,
  });

  const handleInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onShowGameDetails(game);
  };

  const handleJoinClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    joinGame(game.id);
  };

  return (
    <ListItem
      key={game.id}
      onClick={() => onSelectGame(game.id)}
      style={{
        backgroundColor: isSelected ? "#b0c4de" : "#e0e0e0",
        borderRadius: "8px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Typography component="span" variant="body2" style={{ color: "#666" }}>
          Game ID: {game.id.toString()}
        </Typography>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" marginLeft="10px">
            <Typography
              component="span"
              variant="body1"
              style={{ color: "#1976d2", fontWeight: "bold" }}
            >
              {shortenAddress(game.player1)}
            </Typography>
            <Typography
              component="span"
              variant="body1"
              style={{ margin: "0 10px", color: "#333" }}
            >
              vs
            </Typography>
            <Typography
              component="span"
              variant="body1"
              style={{ color: "#333", fontWeight: "bold" }}
            >
              {game.state === GameState.Created
                ? "Unknown"
                : shortenAddress(game.player2)}
            </Typography>
          </Box>
          <IconButton onClick={handleInfoClick}>
            <InfoIcon />
          </IconButton>
          {game.state === GameState.Created && !myGame && (
            <Tooltip title="Join Game">
              <IconButton onClick={handleJoinClick} disabled={!isConnected}>
                {joinGamePending ? (
                  <CircularProgress size={20} />
                ) : (
                  <GroupAddIcon />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </ListItem>
  );
}
