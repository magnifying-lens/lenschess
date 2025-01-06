import {
  ListItem,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Player } from "../../types";
import { shortenAddress } from "../../util";
import { SportsEsports as ChallengeIcon } from "@mui/icons-material"; // Assuming you're using Material UI icons
import { useAccount } from "wagmi";
import useChallengePlayer from "../../hooks/useChallengePlayer";

interface LeaderboardEntryProps {
  player: Player;
  place: number;
}

export default function LeaderboardEntry({
  player,
  place,
}: LeaderboardEntryProps) {
  const { address } = useAccount();

  const { challengePlayer, isPending: challengePlayerPending } =
    useChallengePlayer();

  const myEntry = address?.toLowerCase() === player.address;

  const getMedalStyle = () => {
    switch (place) {
      case 1:
        return { color: "gold" };
      case 2:
        return { color: "silver" };
      case 3:
        return { color: "bronze" };
      default:
        return { visibility: "hidden" as const }; // Explicitly define 'hidden' as const
    }
  };

  return (
    <ListItem
      key={player.address}
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        marginBottom: "10px",
        boxShadow: myEntry ? "0 0 0 2px #FE6B8B, 0 0 0 2px #FF8E53" : undefined,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="body2"
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              ...getMedalStyle(),
            }}
          >
            {place === 1
              ? "\u{1F947}"
              : place === 2
                ? "\u{1F948}"
                : place === 3
                  ? "\u{1F949}"
                  : "🏅"}{" "}
            {place}
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: "#1976d2",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            {shortenAddress(player.address)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            style={{
              color: "#666",
              fontFamily: "monospace",
            }}
          >
            {player.eloRating} ELO
          </Typography>
          <Tooltip title="Challenge player">
            <span>
              {/* Wrapping IconButton with a span to maintain disable functionality */}
              <IconButton
                aria-label="challenge player"
                size="small"
                style={{ marginLeft: "10px" }}
                disabled={myEntry}
                onClick={() => challengePlayer(player.address)}
              >
                {challengePlayerPending ? (
                  <CircularProgress size={20} /> // Adjust size as needed
                ) : (
                  <ChallengeIcon />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </ListItem>
  );
}
