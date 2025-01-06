/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetGames($first: Int, $offset: Int, $filter: GameEventFilter) {\n    getLatestGameEvents(first: $first, offset: $offset, filter: $filter) {\n      nodes {\n        gameId\n        player1\n        player2\n      }\n      totalCount\n    }\n  }\n": types.GetGamesDocument,
    "\n  query GetChallenges($first: Int, $offset: Int, $filter: GameEventFilter) {\n    getLatestGameEvents(first: $first, offset: $offset, filter: $filter) {\n      nodes {\n        gameId\n        player1\n        player2\n      }\n      totalCount\n    }\n  }\n": types.GetChallengesDocument,
    "\n  query GetEloRatings(\n    $first: Int\n    $offset: Int\n    $filter: EloRatingWithPlacementFilter\n  ) {\n    getLatestEloRatingsWithPlacement(\n      first: $first\n      offset: $offset\n      filter: $filter\n    ) {\n      nodes {\n        player\n        rating\n        placement\n      }\n      totalCount\n    }\n  }\n": types.GetEloRatingsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGames($first: Int, $offset: Int, $filter: GameEventFilter) {\n    getLatestGameEvents(first: $first, offset: $offset, filter: $filter) {\n      nodes {\n        gameId\n        player1\n        player2\n      }\n      totalCount\n    }\n  }\n"): typeof import('./graphql').GetGamesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChallenges($first: Int, $offset: Int, $filter: GameEventFilter) {\n    getLatestGameEvents(first: $first, offset: $offset, filter: $filter) {\n      nodes {\n        gameId\n        player1\n        player2\n      }\n      totalCount\n    }\n  }\n"): typeof import('./graphql').GetChallengesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEloRatings(\n    $first: Int\n    $offset: Int\n    $filter: EloRatingWithPlacementFilter\n  ) {\n    getLatestEloRatingsWithPlacement(\n      first: $first\n      offset: $offset\n      filter: $filter\n    ) {\n      nodes {\n        player\n        rating\n        placement\n      }\n      totalCount\n    }\n  }\n"): typeof import('./graphql').GetEloRatingsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
