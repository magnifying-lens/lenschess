import { ShortMove, Square } from "chess.js";
import { Game } from "./types";

/** @dev    Initial white state:
0f: 15 (non-king) pieces left
00: Queen-side rook at a1 position
07: King-side rook at h1 position
04: King at e1 position
ff: En-passant at invalid position
*/
const initial_white_state = 0x000704ff;

/** @dev    Initial black state:
0f: 15 (non-king) pieces left
38: Queen-side rook at a8 position
3f: King-side rook at h8 position
3c: King at e8 position
ff: En-passant at invalid position
*/
const initial_black_state = 0x383f3cff;

const bishop_const = 0x2; // 010
const knight_const = 0x3; // 011
const rook_const = 0x4; // 100
const queen_const = 0x5; // 101

// Conversion function (as defined previously)
export function gameToFEN(game: Game) {
    const board = Array.from({ length: 8 }, () => Array(8).fill(null));

    for (let pos = 0; pos < 64; pos++) {
        const pieceValue = (game.gameState >> BigInt(pos * 4)) & 0xFn;
        const pieceType = pieceValue & 0x7n;
        const isWhite = (pieceValue & 0x8n) === 0x0n;

        let piece = null;

        switch (pieceType) {
            case 0x0n:
                continue;
            case 0x1n:
                piece = 'p';
                break;
            case 0x2n:
                piece = 'b';
                break;
            case 0x3n:
                piece = 'n';
                break;
            case 0x4n:
                piece = 'r';
                break;
            case 0x5n:
                piece = 'q';
                break;
            case 0x6n:
                piece = 'k';
                break;
            default:
                continue;
        }

        if (isWhite) {
            piece = piece.toUpperCase();
        }

        const row = Math.floor(pos / 8);
        const col = pos % 8;

        board[row][col] = piece;
    }

    // Convert board array to FEN notation
    const fenRows = board.map(row => {
        let emptyCount = 0;
        let fenRow = '';

        for (const square of row) {
            if (square === null) {
                emptyCount++;
            } else {
                if (emptyCount > 0) {
                    fenRow += emptyCount;
                    emptyCount = 0;
                }
                fenRow += square;
            }
        }

        if (emptyCount > 0) {
            fenRow += emptyCount;
        }

        return fenRow;
    }).reverse();

    const fenBoard = fenRows.join('/');
    const activeColor = game.isWhitePlayersTurn ? 'w' : 'b'; // assuming white to move, adjust if necessary

    const whiteQueenSideRookMoved = (game.whiteState & 0xFF000000) !== (initial_white_state & 0xFF000000);
    const whiteKingSideRookMoved = (game.whiteState & 0x00FF0000) !== (initial_white_state & 0x00FF0000);
    const whiteKingMoved = (game.whiteState & 0x0000FF00) !== (initial_white_state & 0x0000FF00);

    const blackQueenSideRookMoved = (game.blackState & 0xFF000000) !== (initial_black_state & 0xFF000000);
    const blackKingSideRookMoved = (game.blackState & 0x00FF0000) !== (initial_black_state & 0x00FF0000);
    const blackKingMoved = (game.blackState & 0x0000FF00) !== (initial_black_state & 0x0000FF00);

    let castlingAvailability = '';

    if (!whiteKingMoved) {
        if (!whiteKingSideRookMoved) castlingAvailability += 'K';
        if (!whiteQueenSideRookMoved) castlingAvailability += 'Q';
    }

    if (!blackKingMoved) {
        if (!blackKingSideRookMoved) castlingAvailability += 'k';
        if (!blackQueenSideRookMoved) castlingAvailability += 'q';
    }

    if (castlingAvailability === '') {
        castlingAvailability = '-';
    }

    let enPassantTargetSquare = '-'; // assuming no en passant target square

    const whiteEnPassant = game.whiteState & 0xFF;
    const blackEnPassant = game.blackState & 0xFF;

    if (whiteEnPassant !== 0xFF) {
        const row = Math.floor(whiteEnPassant / 8) + 1;
        const col = whiteEnPassant % 8;
        enPassantTargetSquare = String.fromCharCode(97 + col) + row;
    } else if (blackEnPassant !== 0xFF) {
        const row = Math.floor(blackEnPassant / 8) + 1;
        const col = blackEnPassant % 8;
        enPassantTargetSquare = String.fromCharCode(97 + col) + row;
    }

    return `${fenBoard} ${activeColor} ${castlingAvailability} ${enPassantTargetSquare} ${game.halfMoveClock} ${game.fullMoves}`;
}


export function convert16BitToChessJsMove(move: number): ShortMove {

    // Standard move case
    const fromPos = (move >> 6) & 0x3f;
    const toPos = move & 0x3f;

    const fromSquare = String.fromCharCode(97 + (fromPos % 8)) + (8 - Math.floor(fromPos / 8));
    const toSquare = String.fromCharCode(97 + (toPos % 8)) + (8 - Math.floor(toPos / 8));

    return {
        from: fromSquare as Square,
        to: toSquare as Square,
        promotion: 'q', // Assume promotion to queen for simplicity
    };
}

export function convertChessJsMoveTo16Bit(move: ShortMove): number {
    const fromFile = move.from.charCodeAt(0) - 97;
    const fromRank = parseInt(move.from.charAt(1)) - 1;
    const toFile = move.to.charCodeAt(0) - 97;
    const toRank = parseInt(move.to.charAt(1)) - 1;

    const fromPos = (fromRank * 8) + fromFile;
    const toPos = (toRank * 8) + toFile;

    let moveExtra = 0;
    if (move.promotion === "b") {
        moveExtra = bishop_const;
    } else if (move.promotion === "n") {
        moveExtra = knight_const;
    } else if (move.promotion === "q") {
        moveExtra = queen_const;
    } else if (move.promotion === "r") {
        moveExtra = rook_const;
    }

    return (moveExtra << 12) | (fromPos << 6) | toPos;
}
