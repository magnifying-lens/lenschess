// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Math.sol";
import "./Chess.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "prb-math/contracts/PRBMathSD59x18.sol";

contract LensChess is Initializable {
    using PRBMathSD59x18 for int256;
    Chess public chess;

    enum GameState {
        Created,
        PlayerChallenged,
        Active,
        Finished,
        ChallengeDeclined
    }

    enum Outcome {
        Undecided,
        Draw,
        WhiteWins,
        BlackWins
    }

    enum PlayerExperience {
        NewToChess,
        Beginner,
        Intermediate,
        Advanced,
        Expert
    }

    int256 constant starting_elo = 1000 * 1e18;

    // Game outcomes
    uint8 constant inconclusive_outcome = 0x0;
    uint8 constant draw_outcome = 0x1;
    uint8 constant white_win_outcome = 0x2;
    uint8 constant black_win_outcome = 0x3;

    uint256 constant game_state_start =
        0xcbaedabc99999999000000000000000000000000000000001111111143265234;

    /** @dev    Initial white state:
                0f: 15 (non-king) pieces left
                00: Queen-side rook at a1 position
                07: King-side rook at h1 position
                04: King at e1 position
                ff: En-passant at invalid position
    */
    uint32 constant initial_white_state = 0x000704ff;

    /** @dev    Initial black state:
                0f: 15 (non-king) pieces left
                38: Queen-side rook at a8 position
                3f: King-side rook at h8 position
                3c: King at e8 position
                ff: En-passant at invalid position
    */
    uint32 constant initial_black_state = 0x383f3cff;

    struct Game {
        uint256 id;
        uint32 fullMoves;
        uint32 halfMoveClock;
        GameState state; // State of the game
        bool isWhitePlayersTurn;
        Outcome outcome;
        uint256 gameState;
        uint32 whiteState;
        uint32 blackState;
        address playerWhite; // Address of the player playing white
        address playerBlack; // Address of the player playing white
        address player1; // First player (game creator)
        address player2; // Second player
        uint256 lastMoveTimestamp; // Timestamp of the last move
        bool whiteOfferedDraw;
        bool blackOfferedDraw;
        bool whiteResigned;
        bool blackResigned;
    }

    function getEloRating(address player) public view returns (int256) {
        int256 rating = eloRatings[player];
        if (rating == 0) {
            rating = starting_elo;
        }
        return rating;
    }

    mapping(address => int256) public eloRatings;
    mapping(address => uint32) public numGamesPlayed;

    mapping(uint256 => mapping(address => uint256)) public whiteBets;
    mapping(uint256 => mapping(address => uint256)) public blackBets;
    mapping(uint256 => mapping(address => uint256)) public drawBets;
    mapping(uint256 => uint256) public totalWhiteBets;
    mapping(uint256 => uint256) public totalBlackBets;
    mapping(uint256 => uint256) public totalDrawBets;

    Game[] public games;

    function getGame(uint256 gameId) public view returns (Game memory) {
        Game storage game = games[gameId];
        return (game);
    }

    function getBetTotals(
        uint256 gameId
    ) public view returns (uint256, uint256, uint256) {
        return (
            totalWhiteBets[gameId],
            totalBlackBets[gameId],
            totalDrawBets[gameId]
        );
    }

    function getPlayerBets(
        uint256 gameId,
        address player
    ) public view returns (uint256, uint256, uint256) {
        return (
            whiteBets[gameId][player],
            blackBets[gameId][player],
            drawBets[gameId][player]
        );
    }

    function initialize(address chessAddress) public initializer {
        chess = Chess(chessAddress);
    }

    event BetPlaced(
        uint256 gameId,
        address indexed bettor,
        uint256 amount,
        Outcome indexed outcome
    );
    event MarketSettled(uint256 gameId, Outcome outcome);
    event WinningsWithdrawn(
        uint256 gameId,
        address indexed bettor,
        uint256 amount
    );

    event GameEvent(
        uint256 indexed gameId,
        GameState indexed state,
        address player1,
        address player2
    );

    event EloRatingEvent(address indexed player, int256 indexed rating);

    function adjustEloRatings(
        int256 ratingWhite,
        int256 ratingBlack,
        Outcome outcome
    ) public pure returns (int256 newRatingWhite, int256 newRatingBlack) {
        int256 one = 1e18;
        int256 K = 32 * one; // K-factor in 18-decimal fixed-point format

        // Calculate expected scores for both players using PRBMathSD59x18
        int256 expectedScoreWhite = PRBMathSD59x18.div(
            one,
            one +
                PRBMathSD59x18.exp(
                    PRBMathSD59x18.div(
                        PRBMathSD59x18.mul(
                            int256(10) * one,
                            (ratingBlack - ratingWhite)
                        ),
                        int256(400 * one) // Ensure this division is correctly scaled
                    )
                )
        );

        int256 expectedScoreBlack = PRBMathSD59x18.div(
            one,
            one +
                PRBMathSD59x18.exp(
                    PRBMathSD59x18.div(
                        PRBMathSD59x18.mul(
                            int256(10) * one,
                            (ratingWhite - ratingBlack)
                        ),
                        int256(400 * one) // Ensure this division is correctly scaled
                    )
                )
        );

        int256 actualScoreWhite;
        int256 actualScoreBlack;

        if (outcome == Outcome.WhiteWins) {
            actualScoreWhite = one;
            actualScoreBlack = 0;
        } else if (outcome == Outcome.BlackWins) {
            actualScoreWhite = 0;
            actualScoreBlack = one;
        } else if (outcome == Outcome.Draw) {
            actualScoreWhite = 5e17; // 0.5 in 18-decimal fixed-point format
            actualScoreBlack = 5e17;
        } else {
            revert("Invalid game outcome");
        }

        newRatingWhite =
            ratingWhite +
            PRBMathSD59x18.div(
                PRBMathSD59x18.mul(K, actualScoreWhite - expectedScoreWhite),
                one
            );

        newRatingBlack =
            ratingBlack +
            PRBMathSD59x18.div(
                PRBMathSD59x18.mul(K, actualScoreBlack - expectedScoreBlack),
                one
            );

        // Ensure new ratings are not less than 0
        if (newRatingWhite < 0) {
            newRatingWhite = 0;
        }

        if (newRatingBlack < 0) {
            newRatingBlack = 0;
        }

        return (newRatingWhite, newRatingBlack);
    }

    function finishGame(uint256 gameId) private {
        Game storage game = games[gameId];

        game.state = GameState.Finished;
        numGamesPlayed[game.playerWhite] += 1;
        numGamesPlayed[game.playerBlack] += 1;
        (
            eloRatings[game.playerWhite],
            eloRatings[game.playerBlack]
        ) = adjustEloRatings(
            eloRatings[game.playerWhite],
            eloRatings[game.playerBlack],
            game.outcome
        );
        emit EloRatingEvent(game.playerWhite, eloRatings[game.playerWhite]);
        emit EloRatingEvent(game.playerBlack, eloRatings[game.playerBlack]);
        emit GameEvent(gameId, GameState.Finished, game.player1, game.player2);
    }

    function createGame() public {
        if (eloRatings[msg.sender] == 0) {
            eloRatings[msg.sender] = starting_elo;
            emit EloRatingEvent(msg.sender, eloRatings[msg.sender]);
        }

        Game storage newGame = games.push();
        uint256 gameId = games.length - 1;

        newGame.id = gameId;
        newGame.state = GameState.Created;
        newGame.fullMoves = 1;
        newGame.halfMoveClock = 0;
        newGame.isWhitePlayersTurn = true;
        newGame.outcome = Outcome.Undecided;
        newGame.gameState = game_state_start;
        newGame.whiteState = initial_white_state;
        newGame.blackState = initial_black_state;
        newGame.player1 = msg.sender;
        newGame.player2 = address(0);
        newGame.lastMoveTimestamp = block.timestamp;
        newGame.whiteOfferedDraw = false;
        newGame.blackOfferedDraw = false;
        newGame.whiteResigned = false;
        newGame.blackResigned = false;

        emit GameEvent(
            gameId,
            GameState.Created,
            newGame.player1,
            newGame.player2
        );
    }

    // Join a game
    function joinGame(uint256 gameId) public {
        if (eloRatings[msg.sender] == 0) {
            eloRatings[msg.sender] = starting_elo;
            emit EloRatingEvent(msg.sender, eloRatings[msg.sender]);
        }

        Game storage game = games[gameId];
        require(game.state == GameState.Created, "Game is not joinable");
        require(game.player2 == address(0), "Game already has two players");
        require(msg.sender != game.player1, "You can't join your own game");

        game.player2 = msg.sender;
        game.state = GameState.Active;

        // Randomly assign colors based on block timestamp
        if ((block.timestamp % 2) == 0) {
            game.playerWhite = game.player1;
            game.playerBlack = game.player2;
        } else {
            game.playerWhite = game.player2;
            game.playerBlack = game.player1;
        }
        game.lastMoveTimestamp = block.timestamp;

        emit GameEvent(gameId, GameState.Active, game.player1, game.player2);
    }
    // Challenge another player
    function challengePlayer(address player) public {
        if (eloRatings[msg.sender] == 0) {
            eloRatings[msg.sender] = starting_elo;
            emit EloRatingEvent(msg.sender, eloRatings[msg.sender]);
        }

        Game storage newGame = games.push();
        uint256 gameId = games.length - 1;

        newGame.id = gameId;
        newGame.state = GameState.PlayerChallenged;
        newGame.fullMoves = 1;
        newGame.halfMoveClock = 0;
        newGame.isWhitePlayersTurn = true;
        newGame.outcome = Outcome.Undecided;
        newGame.gameState = game_state_start;
        newGame.whiteState = initial_white_state;
        newGame.blackState = initial_black_state;
        newGame.player1 = msg.sender;
        newGame.player2 = player;
        newGame.lastMoveTimestamp = block.timestamp;
        newGame.whiteOfferedDraw = false;
        newGame.blackOfferedDraw = false;
        newGame.whiteResigned = false;
        newGame.blackResigned = false;

        emit GameEvent(
            gameId,
            GameState.PlayerChallenged,
            newGame.player1,
            newGame.player2
        );
    }

    // Accept a challenge
    function acceptChallenge(uint256 gameId) public {
        if (eloRatings[msg.sender] == 0) {
            eloRatings[msg.sender] = starting_elo;
            emit EloRatingEvent(msg.sender, eloRatings[msg.sender]);
        }

        Game storage game = games[gameId];
        require(
            game.state == GameState.PlayerChallenged,
            "Game is not joinable"
        );
        require(
            game.player2 == msg.sender,
            "You are not the challenged player"
        );

        game.state = GameState.Active;
        if ((block.timestamp % 2) == 0) {
            game.playerWhite = game.player1;
            game.playerBlack = game.player2;
        } else {
            game.playerWhite = game.player2;
            game.playerBlack = game.player1;
        }
        game.lastMoveTimestamp = block.timestamp;

        emit GameEvent(gameId, GameState.Active, game.player1, game.player2);
    }

    // Decline a challenge
    function declineChallenge(uint256 gameId) public {
        Game storage game = games[gameId];
        require(
            game.state == GameState.PlayerChallenged,
            "Game is not joinable"
        );
        require(
            game.player2 == msg.sender,
            "You are not the challenged player"
        );

        game.state = GameState.ChallengeDeclined;

        emit GameEvent(
            gameId,
            GameState.ChallengeDeclined,
            game.player1,
            game.player2
        );
    }

    function resign(uint256 gameId) public {
        Game storage game = games[gameId];
        require(game.outcome == Outcome.Undecided, "Game has already finished");
        require(
            (msg.sender == game.playerWhite && game.isWhitePlayersTurn) ||
                (msg.sender == game.playerBlack && !game.isWhitePlayersTurn),
            "Not your turn"
        );

        if (game.isWhitePlayersTurn) {
            game.outcome = Outcome.BlackWins;
        } else {
            game.outcome = Outcome.WhiteWins;
        }

        finishGame(gameId);
    }

    function offerDraw(uint256 gameId) public {
        Game storage game = games[gameId];
        require(game.outcome == Outcome.Undecided, "Game has already finished");
        require(
            (msg.sender == game.playerWhite && game.isWhitePlayersTurn) ||
                (msg.sender == game.playerBlack && !game.isWhitePlayersTurn),
            "Not your turn"
        );
        require(
            (game.isWhitePlayersTurn && !game.whiteOfferedDraw) ||
                (!game.isWhitePlayersTurn && !game.blackOfferedDraw),
            "Already offered draw"
        );

        if (game.isWhitePlayersTurn) {
            game.whiteOfferedDraw = true;
        } else {
            game.blackOfferedDraw = true;
        }
        game.isWhitePlayersTurn = !game.isWhitePlayersTurn;

        game.lastMoveTimestamp = block.timestamp;
    }

    function concludeDraw(uint256 gameId, bool accept) public {
        Game storage game = games[gameId];
        require(game.outcome == Outcome.Undecided, "Game has already finished");
        require(
            (msg.sender == game.playerWhite && game.isWhitePlayersTurn) ||
                (msg.sender == game.playerBlack && !game.isWhitePlayersTurn),
            "Not your turn"
        );
        require(
            (msg.sender == game.playerWhite && game.blackOfferedDraw) ||
                (msg.sender == game.playerBlack && game.whiteOfferedDraw),
            "No draw was offered"
        );

        if (accept) {
            game.outcome = Outcome.Draw;
            finishGame(gameId);
        } else {
            game.whiteOfferedDraw = false;
            game.blackOfferedDraw = false;
        }
    }

    // Claim a win if opponent did not move within 24 hours
    function claimWin(uint256 gameId) public {
        Game storage game = games[gameId];

        require(
            msg.sender == game.player1 || msg.sender == game.player2,
            "You are not a player in this game"
        );

        require(
            block.timestamp >= game.lastMoveTimestamp + 24 hours,
            "Game not timed out yet"
        );

        if (msg.sender == game.playerWhite) {
            game.outcome = Outcome.WhiteWins;
        } else {
            game.outcome = Outcome.BlackWins;
        }

        finishGame(gameId);
    }

    event TestEvent(uint256 value);

    // Make a move
    function makeMove(uint256 gameId, uint16 move) public {
        Game storage game = games[gameId];
        require(
            msg.sender == game.player1 || msg.sender == game.player2,
            "You are not a player in this game"
        );
        require(game.state == GameState.Active, "Game is not active");
        require(game.outcome == Outcome.Undecided, "Game has already finished");

        // Ensure it's the correct player's turn
        require(
            (msg.sender == game.playerWhite && game.isWhitePlayersTurn) ||
                (msg.sender == game.playerBlack && !game.isWhitePlayersTurn),
            "Not your turn"
        );

        // if opponent does not accept draw and makes a move instead, render it invalid
        if (game.blackOfferedDraw || game.whiteOfferedDraw) {
            game.blackOfferedDraw = false;
            game.whiteOfferedDraw = false;
        }

        // Call external Chess library to validate the move

        uint32 playerState = game.whiteState;
        uint32 opponentState = game.blackState;
        if (!game.isWhitePlayersTurn) {
            playerState = game.blackState;
            opponentState = game.whiteState;
        }

        uint16[] memory moves = new uint16[](1);
        moves[0] = move;

        uint8 outcome = inconclusive_outcome;

        (
            outcome,
            game.gameState,
            playerState,
            opponentState,
            game.halfMoveClock
        ) = chess.checkGame(
            game.gameState,
            playerState,
            opponentState,
            !game.isWhitePlayersTurn,
            moves,
            game.halfMoveClock
        );

        if (game.isWhitePlayersTurn) {
            game.whiteState = opponentState;
            game.blackState = playerState;
        } else {
            game.whiteState = playerState;
            game.blackState = opponentState;
        }

        game.lastMoveTimestamp = block.timestamp;

        // fullMoves always incremented after blacks turn
        if (!game.isWhitePlayersTurn) {
            game.fullMoves += 1;
        }

        if (outcome != inconclusive_outcome) {
            if (outcome == white_win_outcome) {
                game.outcome = Outcome.WhiteWins;
            } else if (outcome == black_win_outcome) {
                game.outcome = Outcome.BlackWins;
            } else if (outcome == draw_outcome) {
                game.outcome = Outcome.Draw;
            }

            finishGame(gameId);
        } else {
            // Switch turns
            game.isWhitePlayersTurn = !game.isWhitePlayersTurn;
        }
    }

    function betWhite(uint256 gameId) external payable {
        Game storage game = games[gameId];
        require(game.outcome == Outcome.Undecided, "Market already settled");
        require(msg.value > 0, "Must send ETH to bet");

        whiteBets[gameId][msg.sender] += msg.value;
        totalWhiteBets[gameId] += msg.value;

        emit BetPlaced(gameId, msg.sender, msg.value, Outcome.WhiteWins);
    }

    function betBlack(uint256 gameId) external payable {
        Game storage game = games[gameId];
        require(game.outcome == Outcome.Undecided, "Market already settled");
        require(msg.value > 0, "Must send ETH to bet");

        blackBets[gameId][msg.sender] += msg.value;
        totalBlackBets[gameId] += msg.value;

        emit BetPlaced(gameId, msg.sender, msg.value, Outcome.BlackWins);
    }

    function betDraw(uint256 gameId) external payable {
        Game storage game = games[gameId];
        require(game.outcome == Outcome.Undecided, "Market already settled");
        require(msg.value > 0, "Must send ETH to bet");

        drawBets[gameId][msg.sender] += msg.value;
        totalDrawBets[gameId] += msg.value;

        emit BetPlaced(gameId, msg.sender, msg.value, Outcome.Draw);
    }

    function withdrawWinnings(uint256 gameId) external {
        Game storage game = games[gameId];
        require(game.outcome != Outcome.Undecided, "Market not yet settled");
        uint256 payout = 0;

        if (
            game.outcome == Outcome.WhiteWins &&
            whiteBets[gameId][msg.sender] > 0
        ) {
            payout =
                (address(this).balance * whiteBets[gameId][msg.sender]) /
                totalWhiteBets[gameId];
            whiteBets[gameId][msg.sender] = 0;
        } else if (
            game.outcome == Outcome.BlackWins &&
            blackBets[gameId][msg.sender] > 0
        ) {
            payout =
                (address(this).balance * blackBets[gameId][msg.sender]) /
                totalBlackBets[gameId];
            blackBets[gameId][msg.sender] = 0;
        } else if (
            game.outcome == Outcome.Draw && drawBets[gameId][msg.sender] > 0
        ) {
            payout =
                (address(this).balance * drawBets[gameId][msg.sender]) /
                totalDrawBets[gameId];
            drawBets[gameId][msg.sender] = 0;
        } else if (game.outcome == Outcome.Undecided) {
            uint256 totalBet = blackBets[gameId][msg.sender] +
                whiteBets[gameId][msg.sender] +
                drawBets[gameId][msg.sender];
            payout = totalBet;
            whiteBets[gameId][msg.sender] = 0;
            blackBets[gameId][msg.sender] = 0;
            drawBets[gameId][msg.sender] = 0;
        } else {
            revert("No winnings to withdraw");
        }

        require(payout > 0, "No payout available");
        (bool success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Could not payout");

        emit WinningsWithdrawn(gameId, msg.sender, payout);
    }
}
