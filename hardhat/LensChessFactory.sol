// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LensChess.sol";

contract LensChessFactory {
    event GameCreated(address indexed creator, address gameAddress);

    address[] public games;

    function createGame(address chessAddress) external {
        LensChess game = new LensChess(msg.sender, chessAddress);
        games.push(address(game));
        emit GameCreated(msg.sender, address(game));
    }

    function getGames() external view returns (address[] memory) {
        return games;
    }
}
