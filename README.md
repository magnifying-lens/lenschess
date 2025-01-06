# LensChess - Lens Network Holiday Hackathon Entry

## Team Members

@magnifying

## Project Description

**LensChess** is an innovative platform that combines the realms of gaming and social networks on the blockchain. Our project leverages decentralized technology to enhance social gaming, starting with "Lenschess," an on-chain chess platform offering competitive play with blockchain transparency.

### Importance of Games in Social Networks

Games are key to fostering community and engagement within social networks through shared experiences. As interactions transition to the blockchain, our platform supports players in showcasing their abilities, forming communities, and engaging in transparent discussions. Validated on-chain game results also open opportunities for more secure and auditable betting markets.

### Potential of Social Credits

We envision a "social credits" system aimed at promoting fair play and creating fairer betting markets in the future. This system could highlight players with high social credibility, allowing the community to engage and bet confidently within a self-regulating ecosystem.

## About Lenschess: Innovating On-Chain Gaming

Lenschess, initially offers:

- A dynamic leaderboard with ELO ratings
- A straightforward player challenge system
- Game spectating and win claims on opponent timeouts

### Roadmap and Integration

Our future plans include integrating with the Lens Protocol to enable:

- Tight integration into lens protocol's social features
- Push notifications for games via your preferred Lens client
- Tournaments with prize pools to enhance competitive play
- No signing required: Implement [ZKSync's SSO](https://github.com/matter-labs/zksync-sso) or lens native account abstraction for a smoother user experience.
- Game Replays
- Betting Markets: Bet on individual games or on tournament outcomes

This project seeks to merge social gaming with blockchain technology, fostering a community driven by skill, reputation, and passion. Join us as we iterate through pre-alpha to shape the future of decentralized social interaction and gaming.

## Source Code Link

https://github.com/magnifying-lens/lenschess

## Preview Link

https://lenschess.xyz/

## Demo Video

https://youtu.be/zXGETPVreWI

## Technical Details

### Contracts

All contracts are compiled, deployed and verified using hardhat. The contracts reside in `hardhat/contracts`.

- **LensChess.sol**: Main Contract. Responsible for game and betting markets tracking.
- **Chess.sol**: Functions to evaluate correct chess moves on-chain. See Acknowledgment section.
- **Math.sol**: Some helper math functions.

### Frontend

The frontend is a vite react project. It uses [react-chessboard](https://www.npmjs.com/package/react-chessboard) package to render the chessboard.
Furthermore [chess.js](https://www.npmjs.com/package/chess.js) is used to check for valid moves before the user is prompted with a transaction request.

For wallet connectivity, [ConnectKit](https://docs.family.co/connectkit) is used.

### API

To get API access for emitted events, this project uses [rindexer](rindexer.xyz) as a no- (or low-) code solution.

Due to some missing features, custom queries were used and need to be setup manually in postgres. See below section for details.

## How to dev

### Prerequisites

1. Install Anvil-Zksync Node from https://github.com/matter-labs/anvil-zksync
2. Install rindexer: https://rindexer.xyz/docs/introduction/installation
3. psql (postgresql-client cli)
4. node >= 20

### 1. start anvil local node

```shell
anvil-zksync run
```

### 2. start rindexer

```shell
cd api
docker compose up -d
rindexer start all
```

### 3. modify postgres with custom functions. This is needed for distinct querying of games.

Connect to local postgres

```shell
psql -h localhost -p 5440 -U postgres -W -d postgres # password: rindexer
```

Execute these SQL statements:

```sql
CREATE OR REPLACE FUNCTION lenschessindexer_lens_chess.get_latest_game_events()
RETURNS SETOF lenschessindexer_lens_chess.game_event AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (game_id) *
    FROM lenschessindexer_lens_chess.game_event
    ORDER BY game_id, block_number DESC;
END;$$ LANGUAGE plpgsql STABLE;

CREATE TYPE lenschessindexer_lens_chess.elo_rating_with_placement AS (
player character(42),
rating character varying(78),
placement int
);

CREATE OR REPLACE FUNCTION lenschessindexer_lens_chess.get_latest_elo_ratings_with_placement()
RETURNS SETOF lenschessindexer_lens_chess.elo_rating_with_placement AS $$
BEGIN
    RETURN QUERY
    SELECT
        player,
        rating,
  		row_number() OVER (ORDER BY rating::numeric DESC)::int AS placement
    FROM (
        SELECT DISTINCT ON (player) player, rating
        FROM lenschessindexer_lens_chess.elo_rating_event
        ORDER BY player, block_number DESC
    ) subquery
    ORDER BY rating::numeric DESC;
END; $$ LANGUAGE plpgsql STABLE;
```

### 4. Compile and Deploy Contracts

```shell
cd hardhat
yarn
yarn compile
yarn deploy --script deploy-lenschess.ts --network anvilZKsync
```

### 5. Start frontend

```shell
cd frontend
npm install
npm run dev
```

### 6. Use App

To use the app locally, its best to import the local rich wallet private keys into the browser wallet of your choice.

The private keys can be found in: `hardhat/deploy/utils.ts`.

**Important:** When you restart the anvil-zksync node, you have to reset the wallet history in your browser wallet. Otherwise all transactions will fail.

Example for Metamask: https://support.metamask.io/managing-my-wallet/resetting-deleting-and-restoring/how-to-clear-your-account-activity-reset-account/

## Acknowledgments

The source code for the chess rule validation contract is taken and modified from https://github.com/marioevz/chess.eth .

Thanks too @josh_dev for all the help with rindexer.
