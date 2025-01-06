import {
  ListItem,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useAccount } from "wagmi";
import {
  CheckCircle as AcceptIcon,
  Close as DeclineIcon,
} from "@mui/icons-material";
import useAcceptChallenge from "../../hooks/useAcceptChallenge";
import { Challenge } from "../../types";
import { shortenAddress } from "../../util";
import { useCallback } from "react";
import useDeclineChallenge from "../../hooks/useDeclineChallenge"; // Importing the hook for declining

interface ChallengeEntryProps {
  challenge: Challenge;
  onSelectGame: (gameId: bigint) => void;
}

export default function ChallengeEntry({
  challenge,
  onSelectGame,
}: ChallengeEntryProps) {
  const { address } = useAccount();
  const myChallenge =
    address?.toLowerCase() === challenge.player1.toLowerCase();

  const onJoinSuccess = useCallback(
    (gameId: bigint) => {
      onSelectGame(gameId);
    },
    [onSelectGame]
  );

  const { acceptChallenge, isPending: acceptChallengePending } =
    useAcceptChallenge({
      onSuccess: onJoinSuccess,
    });

  const { declineChallenge, isPending: declineChallengePending } =
    useDeclineChallenge(); // Setup for declining

  return (
    <ListItem
      key={challenge.gameId}
      style={{
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        marginBottom: "10px",
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
            variant="body1"
            style={{
              color: "#1976d2",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            {shortenAddress(challenge.player1)}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: "#666", fontFamily: "monospace" }}
          >
            {challenge.player1Rating} ELO
          </Typography>
        </Box>
        <Box display="inline-flex" borderRadius="8px" overflow="hidden">
          <Tooltip title="Accept Challenge">
            <IconButton
              disabled={myChallenge}
              onClick={() => {
                if (challenge.gameId) {
                  acceptChallenge(challenge.gameId);
                }
              }}
            >
              {acceptChallengePending ? (
                <CircularProgress size={20} />
              ) : (
                <AcceptIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Decline Challenge">
            <IconButton
              disabled={myChallenge}
              onClick={() => {
                if (challenge.gameId) {
                  declineChallenge(challenge.gameId);
                }
              }}
            >
              {declineChallengePending ? (
                <CircularProgress size={20} />
              ) : (
                <DeclineIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </ListItem>
  );
}
