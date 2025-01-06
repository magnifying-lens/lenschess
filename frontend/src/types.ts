export enum GameState {
  Created,
  PlayerChallenged,
  Active,
  Finished,
  ChallengeDeclined,
}

export interface Player {
  address: Address;
  eloRating: number;
  placement: number;
}

export enum Outcome {
  Undecided,
  Draw,
  WhiteWins,
  BlackWins,
}

export interface Challenge {
  player1: Address;
  player2: Address;
  gameId: bigint;
  player1Rating: number;
}

export enum PlayerExperience {
  NewToChess,
  Beginner,
  Intermediate,
  Advanced,
  Expert,
}

export enum GameOrderBy {
  STATE_ASC,
  STATE_DESC,
}

type Address = `0x${string}`;

export interface Game {
  id: bigint;
  state: GameState; // State of the game
  fullMoves: number;
  halfMoveClock: number;
  isWhitePlayersTurn: boolean;
  outcome: Outcome; // Assuming Outcome is defined elsewhere
  gameState: bigint;
  whiteState: number;
  blackState: number;
  playerWhite: Address; // Address of the player playing white
  playerBlack: Address; // Address of the player playing white
  player1: Address; // First player (game creator)
  player2: Address; // Second player
  lastMoveTimestamp: bigint; // Timestamp of the last move
  whiteOfferedDraw: boolean;
  blackOfferedDraw: boolean;
  whiteResigned: boolean;
  blackResigned: boolean;
}
