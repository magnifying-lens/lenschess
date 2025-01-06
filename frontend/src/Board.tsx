import { useCallback, useEffect, useMemo, useState } from "react";
import { Chess, ShortMove, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import useMakeMove from "./hooks/useMakeMove";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAccount } from "wagmi";
import {
  Piece,
  PromotionPieceOption,
} from "react-chessboard/dist/chessboard/types";
import { Backdrop, CircularProgress } from "@mui/material";
import { Game, GameState } from "./types";
import { gameToFEN } from "./chess-util";

type Props = {
  game?: Game;
};

export default function LensChessBoard({ game }: Props) {
  const [key, setKey] = useState(0);

  const { makeMove, isPending: makeMovePending } = useMakeMove();

  const fen = useMemo(
    () =>
      game
        ? gameToFEN(game)
        : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    [game]
  );

  const checkMove = useCallback(
    (move: ShortMove) => {
      const c = new Chess(fen);
      const result = c.move(move);
      return result !== null; // null if the move was illegal, the move object if the move was legal
    },
    [fen]
  );

  const account = useAccount();
  const myAddress = account.address;

  const activeGame = game?.state === GameState.Active;

  const iAmPlayerWhite =
    game !== undefined && account.isConnected && myAddress === game.playerWhite;
  const iAmPlayerBlack =
    game !== undefined && account.isConnected && myAddress === game.playerBlack;

  const myTurn =
    game !== undefined &&
    activeGame &&
    ((iAmPlayerWhite && game.isWhitePlayersTurn) ||
      (iAmPlayerBlack && !game.isWhitePlayersTurn));

  const isLoading = makeMovePending;

  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square) => {
      const move: ShortMove = {
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      };

      const validMove = checkMove(move);

      if (validMove && game !== undefined) {
        if (
          (move.promotion &&
            move.from[1] === "7" &&
            move.to[1] === "8" &&
            myTurn &&
            iAmPlayerWhite) ||
          (move.promotion &&
            move.from[1] === "2" &&
            move.to[1] === "1" &&
            myTurn &&
            iAmPlayerBlack)
        ) {
          // promotion, do nothing
        } else {
          makeMove(game.id, move);
        }
        return true;
      }

      return false;
    },
    [checkMove, makeMove, game, myTurn, iAmPlayerBlack, iAmPlayerWhite]
  );

  const onPromotionPieceSelect = useCallback(
    (
      piece?: PromotionPieceOption,
      promoteFromSquare?: Square,
      promoteToSquare?: Square
    ) => {
      const move: ShortMove = {
        from: promoteFromSquare ?? "a1",
        to: promoteToSquare ?? "a1",
        // @ts-ignore
        promotion: piece?.charAt(1).toLowerCase() ?? "q",
      };
      // @ts-ignore
      makeMove(game.id, move);

      return true;
    },
    [makeMove, game]
  );

  const isDraggablePice = (args: { piece: Piece; sourceSquare: Square }) => {
    const color = args.piece.charAt(0);
    return (
      myTurn &&
      ((iAmPlayerWhite && color === "w") || (iAmPlayerBlack && color === "b"))
    );
  };

  // work araound for isDraggablePiece bug
  useEffect(() => {
    setKey((k) => k + 1);
  }, [myTurn, iAmPlayerWhite, iAmPlayerBlack]);

  console.log({
    fen,
    gameState: game ? game.gameState.toString(16) : undefined,
  });

  // Modify the return statement
  return (
    <Box position="relative" height="100%">
      <Chessboard
        key={key}
        position={fen}
        onPieceDrop={onDrop}
        isDraggablePiece={isDraggablePice}
        onPromotionPieceSelect={onPromotionPieceSelect}
        boardOrientation={iAmPlayerWhite ? "white" : "black"}
      />
      {game === undefined && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" color="white">
            Select a game to see the board
          </Typography>
        </Box>
      )}
      <Backdrop open={isLoading} style={{ zIndex: 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
