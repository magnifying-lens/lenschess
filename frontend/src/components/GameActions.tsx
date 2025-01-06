import React from "react";
import { Button, Typography } from "@mui/material";

interface GameActionsProps {
  gameId: string;
  onPlaceBet: (gameId: string, result: string) => void;
  onClaimWinnings: (gameId: string) => void;
}

const GameActions: React.FC<GameActionsProps> = ({
  gameId,
  onPlaceBet,
  onClaimWinnings,
}) => (
  <div>
    <Typography variant="h6">Actions for Game: {gameId}</Typography>
    <Button onClick={() => onPlaceBet(gameId, "whiteWins")}>
      Bet White Wins
    </Button>
    <Button onClick={() => onPlaceBet(gameId, "blackWins")}>
      Bet Black Wins
    </Button>
    <Button onClick={() => onPlaceBet(gameId, "draw")}>Bet Draw</Button>
    <Button onClick={() => onClaimWinnings(gameId)}>Claim Winnings</Button>
  </div>
);

export default GameActions;
