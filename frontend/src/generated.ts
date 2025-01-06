import {
  createUseReadContract,
  createUseWatchContractEvent,
  createUseWriteContract,
  createUseSimulateContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Chess
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const chessAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkBishopValidMoves',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'opponentState', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'checkEndgame',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'checkForCheck',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'startingGameState', internalType: 'uint256', type: 'uint256' },
      { name: 'startingPlayerState', internalType: 'uint32', type: 'uint32' },
      { name: 'startingOpponentState', internalType: 'uint32', type: 'uint32' },
      { name: 'startingTurnBlack', internalType: 'bool', type: 'bool' },
      { name: 'moves', internalType: 'uint16[]', type: 'uint16[]' },
      { name: 'halfMoveClock', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'checkGame',
    outputs: [
      { name: 'outcome', internalType: 'uint8', type: 'uint8' },
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'opponentState', internalType: 'uint32', type: 'uint32' },
      { name: 'newHalfMoveClock', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'moves', internalType: 'uint16[]', type: 'uint16[]' }],
    name: 'checkGameFromStart',
    outputs: [
      { name: '', internalType: 'uint8', type: 'uint8' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkKingValidMoves',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkKnightValidMoves',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'opponentState', internalType: 'uint32', type: 'uint32' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkPawnValidMoves',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkQueenValidMoves',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkRookValidMoves',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'commitMove',
    outputs: [
      { name: 'newGameState', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'getHorizontalMovement',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'getInBetweenMask',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'pos', internalType: 'uint8', type: 'uint8' }],
    name: 'getPositionMask',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'getVerticalMovement',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'pos', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'pieceAtPosition',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'pos', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'pieceUnderAttack',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'opponentState', internalType: 'uint32', type: 'uint32' },
      { name: 'color', internalType: 'uint8', type: 'uint8' },
      { name: 'pBitOffset', internalType: 'uint16', type: 'uint16' },
      { name: 'bitSize', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'searchPiece',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'pos', internalType: 'uint8', type: 'uint8' },
      { name: 'piece', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setPosition',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'verifyExecuteBishopMove',
    outputs: [
      { name: 'newGameState', internalType: 'uint256', type: 'uint256' },
      { name: 'captured', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'verifyExecuteKingMove',
    outputs: [
      { name: 'newGameState', internalType: 'uint256', type: 'uint256' },
      { name: 'newPlayerState', internalType: 'uint32', type: 'uint32' },
      { name: 'captured', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'verifyExecuteKnightMove',
    outputs: [
      { name: 'newGameState', internalType: 'uint256', type: 'uint256' },
      { name: 'captured', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'move', internalType: 'uint16', type: 'uint16' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'opponentState', internalType: 'uint32', type: 'uint32' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
      { name: 'halfMoveClock', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'verifyExecuteMove',
    outputs: [
      { name: 'newGameState', internalType: 'uint256', type: 'uint256' },
      { name: 'newPlayerState', internalType: 'uint32', type: 'uint32' },
      { name: 'newOpponentState', internalType: 'uint32', type: 'uint32' },
      { name: 'newHalfMoveClock', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
      { name: 'moveExtra', internalType: 'uint8', type: 'uint8' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
      { name: 'playerState', internalType: 'uint32', type: 'uint32' },
      { name: 'opponentState', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'verifyExecutePawnMove',
    outputs: [
      { name: 'newGameState', internalType: 'uint256', type: 'uint256' },
      { name: 'newPlayerState', internalType: 'uint32', type: 'uint32' },
      { name: 'captured', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'verifyExecuteQueenMove',
    outputs: [
      { name: 'newGameState', internalType: 'uint256', type: 'uint256' },
      { name: 'captured', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'fromPos', internalType: 'uint8', type: 'uint8' },
      { name: 'toPos', internalType: 'uint8', type: 'uint8' },
      { name: 'currentTurnBlack', internalType: 'bool', type: 'bool' },
    ],
    name: 'verifyExecuteRookMove',
    outputs: [
      { name: 'newGameState', internalType: 'uint256', type: 'uint256' },
      { name: 'captured', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'pos', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'zeroPosition',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initializable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const initializableAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LensChess
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const lensChessAbi = [
  { type: 'error', inputs: [], name: 'PRBMathSD59x18__DivInputTooSmall' },
  {
    type: 'error',
    inputs: [{ name: 'rAbs', internalType: 'uint256', type: 'uint256' }],
    name: 'PRBMathSD59x18__DivOverflow',
  },
  {
    type: 'error',
    inputs: [{ name: 'x', internalType: 'int256', type: 'int256' }],
    name: 'PRBMathSD59x18__Exp2InputTooBig',
  },
  {
    type: 'error',
    inputs: [{ name: 'x', internalType: 'int256', type: 'int256' }],
    name: 'PRBMathSD59x18__ExpInputTooBig',
  },
  { type: 'error', inputs: [], name: 'PRBMathSD59x18__MulInputTooSmall' },
  {
    type: 'error',
    inputs: [{ name: 'rAbs', internalType: 'uint256', type: 'uint256' }],
    name: 'PRBMathSD59x18__MulOverflow',
  },
  {
    type: 'error',
    inputs: [{ name: 'prod1', internalType: 'uint256', type: 'uint256' }],
    name: 'PRBMath__MulDivFixedPointOverflow',
  },
  {
    type: 'error',
    inputs: [
      { name: 'prod1', internalType: 'uint256', type: 'uint256' },
      { name: 'denominator', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PRBMath__MulDivOverflow',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bettor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'outcome',
        internalType: 'enum LensChess.Outcome',
        type: 'uint8',
        indexed: true,
      },
    ],
    name: 'BetPlaced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'rating', internalType: 'int256', type: 'int256', indexed: true },
    ],
    name: 'EloRatingEvent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'state',
        internalType: 'enum LensChess.GameState',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'player1',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'player2',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GameEvent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'outcome',
        internalType: 'enum LensChess.Outcome',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'MarketSettled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TestEvent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bettor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WinningsWithdrawn',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'acceptChallenge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'ratingWhite', internalType: 'int256', type: 'int256' },
      { name: 'ratingBlack', internalType: 'int256', type: 'int256' },
      {
        name: 'outcome',
        internalType: 'enum LensChess.Outcome',
        type: 'uint8',
      },
    ],
    name: 'adjustEloRatings',
    outputs: [
      { name: 'newRatingWhite', internalType: 'int256', type: 'int256' },
      { name: 'newRatingBlack', internalType: 'int256', type: 'int256' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'betBlack',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'betDraw',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'betWhite',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'blackBets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'player', internalType: 'address', type: 'address' }],
    name: 'challengePlayer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'chess',
    outputs: [{ name: '', internalType: 'contract Chess', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'claimWin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameId', internalType: 'uint256', type: 'uint256' },
      { name: 'accept', internalType: 'bool', type: 'bool' },
    ],
    name: 'concludeDraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'createGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'declineChallenge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'drawBets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'eloRatings',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'games',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'fullMoves', internalType: 'uint32', type: 'uint32' },
      { name: 'halfMoveClock', internalType: 'uint32', type: 'uint32' },
      {
        name: 'state',
        internalType: 'enum LensChess.GameState',
        type: 'uint8',
      },
      { name: 'isWhitePlayersTurn', internalType: 'bool', type: 'bool' },
      {
        name: 'outcome',
        internalType: 'enum LensChess.Outcome',
        type: 'uint8',
      },
      { name: 'gameState', internalType: 'uint256', type: 'uint256' },
      { name: 'whiteState', internalType: 'uint32', type: 'uint32' },
      { name: 'blackState', internalType: 'uint32', type: 'uint32' },
      { name: 'playerWhite', internalType: 'address', type: 'address' },
      { name: 'playerBlack', internalType: 'address', type: 'address' },
      { name: 'player1', internalType: 'address', type: 'address' },
      { name: 'player2', internalType: 'address', type: 'address' },
      { name: 'lastMoveTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'whiteOfferedDraw', internalType: 'bool', type: 'bool' },
      { name: 'blackOfferedDraw', internalType: 'bool', type: 'bool' },
      { name: 'whiteResigned', internalType: 'bool', type: 'bool' },
      { name: 'blackResigned', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBetTotals',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'player', internalType: 'address', type: 'address' }],
    name: 'getEloRating',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'getGame',
    outputs: [
      {
        name: '',
        internalType: 'struct LensChess.Game',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'fullMoves', internalType: 'uint32', type: 'uint32' },
          { name: 'halfMoveClock', internalType: 'uint32', type: 'uint32' },
          {
            name: 'state',
            internalType: 'enum LensChess.GameState',
            type: 'uint8',
          },
          { name: 'isWhitePlayersTurn', internalType: 'bool', type: 'bool' },
          {
            name: 'outcome',
            internalType: 'enum LensChess.Outcome',
            type: 'uint8',
          },
          { name: 'gameState', internalType: 'uint256', type: 'uint256' },
          { name: 'whiteState', internalType: 'uint32', type: 'uint32' },
          { name: 'blackState', internalType: 'uint32', type: 'uint32' },
          { name: 'playerWhite', internalType: 'address', type: 'address' },
          { name: 'playerBlack', internalType: 'address', type: 'address' },
          { name: 'player1', internalType: 'address', type: 'address' },
          { name: 'player2', internalType: 'address', type: 'address' },
          {
            name: 'lastMoveTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'whiteOfferedDraw', internalType: 'bool', type: 'bool' },
          { name: 'blackOfferedDraw', internalType: 'bool', type: 'bool' },
          { name: 'whiteResigned', internalType: 'bool', type: 'bool' },
          { name: 'blackResigned', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameId', internalType: 'uint256', type: 'uint256' },
      { name: 'player', internalType: 'address', type: 'address' },
    ],
    name: 'getPlayerBets',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'chessAddress', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'joinGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameId', internalType: 'uint256', type: 'uint256' },
      { name: 'move', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'makeMove',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'numGamesPlayed',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'offerDraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'resign',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'totalBlackBets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'totalDrawBets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'totalWhiteBets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'whiteBets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawWinnings',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const lensChessAddress = {
  1: '0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const lensChessConfig = {
  address: lensChessAddress,
  abi: lensChessAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Test
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TestEvent',
  },
  {
    type: 'function',
    inputs: [],
    name: 'test',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__
 */
export const useReadChess = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkBishopValidMoves"`
 */
export const useReadChessCheckBishopValidMoves =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'checkBishopValidMoves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkEndgame"`
 */
export const useReadChessCheckEndgame = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'checkEndgame',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkForCheck"`
 */
export const useReadChessCheckForCheck = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'checkForCheck',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkGame"`
 */
export const useReadChessCheckGame = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'checkGame',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkGameFromStart"`
 */
export const useReadChessCheckGameFromStart =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'checkGameFromStart',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkKingValidMoves"`
 */
export const useReadChessCheckKingValidMoves =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'checkKingValidMoves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkKnightValidMoves"`
 */
export const useReadChessCheckKnightValidMoves =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'checkKnightValidMoves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkPawnValidMoves"`
 */
export const useReadChessCheckPawnValidMoves =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'checkPawnValidMoves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkQueenValidMoves"`
 */
export const useReadChessCheckQueenValidMoves =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'checkQueenValidMoves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"checkRookValidMoves"`
 */
export const useReadChessCheckRookValidMoves =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'checkRookValidMoves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"commitMove"`
 */
export const useReadChessCommitMove = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'commitMove',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"getHorizontalMovement"`
 */
export const useReadChessGetHorizontalMovement =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'getHorizontalMovement',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"getInBetweenMask"`
 */
export const useReadChessGetInBetweenMask = /*#__PURE__*/ createUseReadContract(
  { abi: chessAbi, functionName: 'getInBetweenMask' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"getPositionMask"`
 */
export const useReadChessGetPositionMask = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'getPositionMask',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"getVerticalMovement"`
 */
export const useReadChessGetVerticalMovement =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'getVerticalMovement',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"pieceAtPosition"`
 */
export const useReadChessPieceAtPosition = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'pieceAtPosition',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"pieceUnderAttack"`
 */
export const useReadChessPieceUnderAttack = /*#__PURE__*/ createUseReadContract(
  { abi: chessAbi, functionName: 'pieceUnderAttack' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"searchPiece"`
 */
export const useReadChessSearchPiece = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'searchPiece',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"setPosition"`
 */
export const useReadChessSetPosition = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'setPosition',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"verifyExecuteBishopMove"`
 */
export const useReadChessVerifyExecuteBishopMove =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'verifyExecuteBishopMove',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"verifyExecuteKingMove"`
 */
export const useReadChessVerifyExecuteKingMove =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'verifyExecuteKingMove',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"verifyExecuteKnightMove"`
 */
export const useReadChessVerifyExecuteKnightMove =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'verifyExecuteKnightMove',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"verifyExecuteMove"`
 */
export const useReadChessVerifyExecuteMove =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'verifyExecuteMove',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"verifyExecutePawnMove"`
 */
export const useReadChessVerifyExecutePawnMove =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'verifyExecutePawnMove',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"verifyExecuteQueenMove"`
 */
export const useReadChessVerifyExecuteQueenMove =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'verifyExecuteQueenMove',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"verifyExecuteRookMove"`
 */
export const useReadChessVerifyExecuteRookMove =
  /*#__PURE__*/ createUseReadContract({
    abi: chessAbi,
    functionName: 'verifyExecuteRookMove',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link chessAbi}__ and `functionName` set to `"zeroPosition"`
 */
export const useReadChessZeroPosition = /*#__PURE__*/ createUseReadContract({
  abi: chessAbi,
  functionName: 'zeroPosition',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initializableAbi}__
 */
export const useWatchInitializableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: initializableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initializableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchInitializableInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: initializableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChess = /*#__PURE__*/ createUseReadContract({
  abi: lensChessAbi,
  address: lensChessAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"adjustEloRatings"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessAdjustEloRatings =
  /*#__PURE__*/ createUseReadContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'adjustEloRatings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"blackBets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessBlackBets = /*#__PURE__*/ createUseReadContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'blackBets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"chess"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessChess = /*#__PURE__*/ createUseReadContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'chess',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"drawBets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessDrawBets = /*#__PURE__*/ createUseReadContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'drawBets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"eloRatings"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessEloRatings = /*#__PURE__*/ createUseReadContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'eloRatings',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"games"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessGames = /*#__PURE__*/ createUseReadContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'games',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"getBetTotals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessGetBetTotals = /*#__PURE__*/ createUseReadContract(
  {
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'getBetTotals',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"getEloRating"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessGetEloRating = /*#__PURE__*/ createUseReadContract(
  {
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'getEloRating',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"getGame"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessGetGame = /*#__PURE__*/ createUseReadContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'getGame',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"getPlayerBets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessGetPlayerBets =
  /*#__PURE__*/ createUseReadContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'getPlayerBets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"numGamesPlayed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessNumGamesPlayed =
  /*#__PURE__*/ createUseReadContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'numGamesPlayed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"totalBlackBets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessTotalBlackBets =
  /*#__PURE__*/ createUseReadContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'totalBlackBets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"totalDrawBets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessTotalDrawBets =
  /*#__PURE__*/ createUseReadContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'totalDrawBets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"totalWhiteBets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessTotalWhiteBets =
  /*#__PURE__*/ createUseReadContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'totalWhiteBets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"whiteBets"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useReadLensChessWhiteBets = /*#__PURE__*/ createUseReadContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'whiteBets',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChess = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"acceptChallenge"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessAcceptChallenge =
  /*#__PURE__*/ createUseWriteContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'acceptChallenge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"betBlack"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessBetBlack = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'betBlack',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"betDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessBetDraw = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'betDraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"betWhite"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessBetWhite = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'betWhite',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"challengePlayer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessChallengePlayer =
  /*#__PURE__*/ createUseWriteContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'challengePlayer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"claimWin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessClaimWin = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'claimWin',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"concludeDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessConcludeDraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'concludeDraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"createGame"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessCreateGame = /*#__PURE__*/ createUseWriteContract(
  { abi: lensChessAbi, address: lensChessAddress, functionName: 'createGame' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"declineChallenge"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessDeclineChallenge =
  /*#__PURE__*/ createUseWriteContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'declineChallenge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessInitialize = /*#__PURE__*/ createUseWriteContract(
  { abi: lensChessAbi, address: lensChessAddress, functionName: 'initialize' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"joinGame"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessJoinGame = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'joinGame',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"makeMove"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessMakeMove = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'makeMove',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"offerDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessOfferDraw = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'offerDraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"resign"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessResign = /*#__PURE__*/ createUseWriteContract({
  abi: lensChessAbi,
  address: lensChessAddress,
  functionName: 'resign',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"withdrawWinnings"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWriteLensChessWithdrawWinnings =
  /*#__PURE__*/ createUseWriteContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'withdrawWinnings',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChess = /*#__PURE__*/ createUseSimulateContract({
  abi: lensChessAbi,
  address: lensChessAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"acceptChallenge"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessAcceptChallenge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'acceptChallenge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"betBlack"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessBetBlack =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'betBlack',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"betDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessBetDraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'betDraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"betWhite"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessBetWhite =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'betWhite',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"challengePlayer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessChallengePlayer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'challengePlayer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"claimWin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessClaimWin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'claimWin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"concludeDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessConcludeDraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'concludeDraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"createGame"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessCreateGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'createGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"declineChallenge"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessDeclineChallenge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'declineChallenge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"joinGame"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessJoinGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'joinGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"makeMove"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessMakeMove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'makeMove',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"offerDraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessOfferDraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'offerDraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"resign"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessResign =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'resign',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lensChessAbi}__ and `functionName` set to `"withdrawWinnings"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useSimulateLensChessWithdrawWinnings =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lensChessAbi,
    address: lensChessAddress,
    functionName: 'withdrawWinnings',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lensChessAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWatchLensChessEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: lensChessAbi, address: lensChessAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lensChessAbi}__ and `eventName` set to `"BetPlaced"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWatchLensChessBetPlacedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lensChessAbi,
    address: lensChessAddress,
    eventName: 'BetPlaced',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lensChessAbi}__ and `eventName` set to `"EloRatingEvent"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWatchLensChessEloRatingEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lensChessAbi,
    address: lensChessAddress,
    eventName: 'EloRatingEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lensChessAbi}__ and `eventName` set to `"GameEvent"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWatchLensChessGameEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lensChessAbi,
    address: lensChessAddress,
    eventName: 'GameEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lensChessAbi}__ and `eventName` set to `"Initialized"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWatchLensChessInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lensChessAbi,
    address: lensChessAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lensChessAbi}__ and `eventName` set to `"MarketSettled"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWatchLensChessMarketSettledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lensChessAbi,
    address: lensChessAddress,
    eventName: 'MarketSettled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lensChessAbi}__ and `eventName` set to `"TestEvent"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWatchLensChessTestEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lensChessAbi,
    address: lensChessAddress,
    eventName: 'TestEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lensChessAbi}__ and `eventName` set to `"WinningsWithdrawn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6B828bcb33305478cd7d27eB323F5C5B7b4aFdbe)
 */
export const useWatchLensChessWinningsWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lensChessAbi,
    address: lensChessAddress,
    eventName: 'WinningsWithdrawn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testAbi}__
 */
export const useWriteTest = /*#__PURE__*/ createUseWriteContract({
  abi: testAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"test"`
 */
export const useWriteTestTest = /*#__PURE__*/ createUseWriteContract({
  abi: testAbi,
  functionName: 'test',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testAbi}__
 */
export const useSimulateTest = /*#__PURE__*/ createUseSimulateContract({
  abi: testAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"test"`
 */
export const useSimulateTestTest = /*#__PURE__*/ createUseSimulateContract({
  abi: testAbi,
  functionName: 'test',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testAbi}__
 */
export const useWatchTestEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: testAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"TestEvent"`
 */
export const useWatchTestTestEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: testAbi,
    eventName: 'TestEvent',
  })
