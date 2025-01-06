import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  DialogActions,
  Grid,
} from "@mui/material";
import { Game, GameState, Outcome } from "../types";

interface GameDetailsProps {
  open: boolean;
  handleClose: () => void;
  game: Game;
}

export default function GameDetails({
  open,
  handleClose,
  game,
}: GameDetailsProps) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Game Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              Game ID: {game.id.toString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">State:</Typography>
            <Typography variant="body2" color="textSecondary">
              {GameState[game.state]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Outcome:</Typography>
            <Typography variant="body2" color="textSecondary">
              {Outcome[game.outcome]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Full Moves:</Typography>
            <Typography variant="body2" color="textSecondary">
              {game.fullMoves}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Half Move Clock:</Typography>
            <Typography variant="body2" color="textSecondary">
              {game.halfMoveClock}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Turn:</Typography>
            <Typography variant="body2" color="textSecondary">
              {game.isWhitePlayersTurn ? "White" : "Black"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Last Move:</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(Number(game.lastMoveTimestamp)).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">White Offered Draw:</Typography>
            <Typography
              variant="body2"
              color={game.whiteOfferedDraw ? "success.main" : "textSecondary"}
            >
              {game.whiteOfferedDraw ? "Yes" : "No"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Black Offered Draw:</Typography>
            <Typography
              variant="body2"
              color={game.blackOfferedDraw ? "success.main" : "textSecondary"}
            >
              {game.blackOfferedDraw ? "Yes" : "No"}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
