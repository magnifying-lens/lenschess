import { useState } from "react";
import {
  ListItem,
  Typography,
  Box,
  Tooltip,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Game } from "../../types";
import { shortenAddress } from "../../util";
import { useAccount } from "wagmi";
import { useInterval } from "usehooks-ts";
import useOfferDraw from "../../hooks/useOfferDraw";
import useResign from "../../hooks/useResign";
import useConcludeDraw from "../../hooks/useConcludeDraw";
import useClaimWin from "../../hooks/useClaimWin";

interface MyGameEntryProps {
  game: Game;
  onSelectGame: (gameId: bigint) => void;
  selectedGameId: bigint | null;
}

export default function MyGameEntry({
  game,
  onSelectGame,
  selectedGameId,
}: MyGameEntryProps) {
  const isSelected = game.id === selectedGameId;
  const { address, isConnected } = useAccount();

  const { offerDraw } = useOfferDraw();
  const { resign } = useResign();
  const { concludeDraw } = useConcludeDraw();
  const { claimWin } = useClaimWin();

  const iAmPlayerWhite = isConnected && game.playerWhite === address;
  const iAmPlayerBlack = isConnected && game.playerBlack === address;

  const myTurn =
    (iAmPlayerWhite && game.isWhitePlayersTurn) ||
    (iAmPlayerBlack && !game.isWhitePlayersTurn);

  const drawOfferAvailable =
    myTurn &&
    ((game.whiteOfferedDraw && address === game.playerBlack) ||
      (game.blackOfferedDraw && address === game.playerWhite));

  const winClaimable =
    game !== undefined &&
    ((iAmPlayerWhite && !game.isWhitePlayersTurn) ||
      (iAmPlayerBlack && game.isWhitePlayersTurn)) &&
    BigInt(Date.now()) - game.lastMoveTimestamp >= BigInt(24 * 60 * 60 * 1000);

  const calculateRemainingTime = (): number => {
    const now = new Date();
    const lastMoveDate = new Date(Number(game.lastMoveTimestamp));
    const elapsedTime = now.getTime() - lastMoveDate.getTime();
    return Math.max(0, 24 * 3600 * 1000 - elapsedTime);
  };

  const [timeLeft, setTimeLeft] = useState(calculateRemainingTime());
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  useInterval(() => {
    setTimeLeft(calculateRemainingTime());
  }, 5000);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent click propagation
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <ListItem
      key={game.id}
      onClick={() => {
        if (!menuAnchorEl) {
          onSelectGame(game.id);
        }
      }}
      style={{
        backgroundColor: isSelected ? "#b0c4de" : "#e0e0e0",
        borderRadius: "8px",
        marginBottom: "10px",
        cursor: "pointer",
        boxShadow: "0 0 0 2px #FE6B8B, 0 0 0 2px #FF8E53",
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
        <Tooltip
          title={
            myTurn
              ? "Your Turn"
              : `Opponent's turn. Time left: ${Math.floor(
                  timeLeft / 1000 / 60 / 60
                )} hrs ${Math.floor((timeLeft / 1000 / 60) % 60)} mins`
          }
          arrow
        >
          <Badge
            badgeContent={
              myTurn ? (
                <PlayCircleFilledIcon style={{ color: "#4caf50" }} />
              ) : (
                <PauseCircleOutlineIcon style={{ color: "#aaa" }} />
              )
            }
            overlap="circular"
          />
        </Tooltip>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" marginLeft="10px">
            <Typography
              component="span"
              variant="body1"
              style={{ color: "#1976d2", fontWeight: "bold" }}
            >
              {shortenAddress(game.playerWhite)}
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
              {shortenAddress(game.playerBlack)}
            </Typography>
          </Box>
          <IconButton
            disabled={!myTurn && !winClaimable}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            {myTurn && (
              <>
                {!drawOfferAvailable && (
                  <MenuItem
                    onClick={() => {
                      offerDraw(game.id);
                      handleMenuClose();
                    }}
                  >
                    Offer Draw
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    resign(game.id);
                    handleMenuClose();
                  }}
                >
                  Resign
                </MenuItem>
              </>
            )}
            {drawOfferAvailable && (
              <>
                <MenuItem
                  onClick={() => {
                    concludeDraw(game.id, true);
                    handleMenuClose();
                  }}
                >
                  Accept Draw
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    concludeDraw(game.id, false);
                    handleMenuClose();
                  }}
                >
                  Decline Draw
                </MenuItem>
              </>
            )}
            {!myTurn && winClaimable && (
              <MenuItem
                onClick={() => {
                  claimWin(game.id);
                  handleMenuClose();
                }}
              >
                Claim Win
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Box>
    </ListItem>
  );
}
