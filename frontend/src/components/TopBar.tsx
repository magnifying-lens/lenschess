import "@rainbow-me/rainbowkit/styles.css";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ConnectKitButton } from "connectkit";
import { Game, GameState, Outcome } from "../types";
import { useAccount } from "wagmi";
import useCreateGame from "../hooks/useCreateGame";
import { useMemo } from "react";

interface Props {
  game?: Game;
}

const TopBar = ({ game }: Props) => {
  const { createGame, isPending } = useCreateGame();
  const { address, isConnected } = useAccount();

  const iAmPlayerWhite =
    game !== undefined && isConnected && address === game.playerWhite;
  const iAmPlayerBlack =
    game !== undefined && isConnected && address === game.playerBlack;

  const myTurn =
    game !== undefined &&
    ((iAmPlayerWhite && game.isWhitePlayersTurn) ||
      (iAmPlayerBlack && !game.isWhitePlayersTurn));

  const title = useMemo(() => {
    if (!game) return "LensChess - No game selected";

    return `LensChess - Game ID: ${game.id}`;
  }, [game]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{title}</Typography>

        {/* Center Content */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {game !== undefined && (iAmPlayerWhite || iAmPlayerBlack) && (
            <>
              <Typography variant="h6" color="inherit" sx={{ mx: 2 }}>
                {game.state === GameState.Active
                  ? myTurn
                    ? "It's your turn"
                    : "Waiting for opponent's turn"
                  : game.outcome === Outcome.Draw
                    ? "Game is a draw"
                    : game.outcome === Outcome.WhiteWins
                      ? iAmPlayerWhite
                        ? "You won!"
                        : "Opponent won"
                      : game.outcome === Outcome.BlackWins
                        ? iAmPlayerBlack
                          ? "You won!"
                          : "Opponent won"
                        : ""}
              </Typography>
            </>
          )}
        </Box>

        {/* Right Side Content */}
        <LoadingButton loading={isPending} onClick={createGame}>
          Create Game
        </LoadingButton>
        <div style={{ marginLeft: "16px" }}>
          <ConnectKitButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
