/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: { input: any; output: any; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any; }
};

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

export type EloRatingEvent = Node & {
  __typename?: 'EloRatingEvent';
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['BigFloat']['output'];
  contractAddress: Scalars['String']['output'];
  logIndex: Scalars['String']['output'];
  network: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  player?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['String']['output']>;
  rindexerId: Scalars['Int']['output'];
  txHash: Scalars['String']['output'];
  txIndex: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `EloRatingEvent` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EloRatingEventCondition = {
  /** Checks for equality with the object’s `blockHash` field. */
  blockHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Checks for equality with the object’s `contractAddress` field. */
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `logIndex` field. */
  logIndex?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `network` field. */
  network?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `player` field. */
  player?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rating` field. */
  rating?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rindexerId` field. */
  rindexerId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `txIndex` field. */
  txIndex?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** A filter to be used against `EloRatingEvent` object types. All fields are combined with a logical ‘and.’ */
export type EloRatingEventFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EloRatingEventFilter>>;
  /** Filter by the object’s `blockHash` field. */
  blockHash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `contractAddress` field. */
  contractAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `logIndex` field. */
  logIndex?: InputMaybe<StringFilter>;
  /** Filter by the object’s `network` field. */
  network?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EloRatingEventFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EloRatingEventFilter>>;
  /** Filter by the object’s `player` field. */
  player?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rating` field. */
  rating?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rindexerId` field. */
  rindexerId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `txIndex` field. */
  txIndex?: InputMaybe<BigFloatFilter>;
};

/** A connection to a list of `EloRatingEvent` values. */
export type EloRatingEventsConnection = {
  __typename?: 'EloRatingEventsConnection';
  /** A list of edges which contains the `EloRatingEvent` and cursor to aid in pagination. */
  edges: Array<EloRatingEventsEdge>;
  /** A list of `EloRatingEvent` objects. */
  nodes: Array<Maybe<EloRatingEvent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EloRatingEvent` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `EloRatingEvent` edge in the connection. */
export type EloRatingEventsEdge = {
  __typename?: 'EloRatingEventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EloRatingEvent` at the end of the edge. */
  node?: Maybe<EloRatingEvent>;
};

/** Methods to use when ordering `EloRatingEvent`. */
export enum EloRatingEventsOrderBy {
  BlockHashAsc = 'BLOCK_HASH_ASC',
  BlockHashDesc = 'BLOCK_HASH_DESC',
  BlockNumberAsc = 'BLOCK_NUMBER_ASC',
  BlockNumberDesc = 'BLOCK_NUMBER_DESC',
  ContractAddressAsc = 'CONTRACT_ADDRESS_ASC',
  ContractAddressDesc = 'CONTRACT_ADDRESS_DESC',
  LogIndexAsc = 'LOG_INDEX_ASC',
  LogIndexDesc = 'LOG_INDEX_DESC',
  Natural = 'NATURAL',
  NetworkAsc = 'NETWORK_ASC',
  NetworkDesc = 'NETWORK_DESC',
  PlayerAsc = 'PLAYER_ASC',
  PlayerDesc = 'PLAYER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RatingAsc = 'RATING_ASC',
  RatingDesc = 'RATING_DESC',
  RindexerIdAsc = 'RINDEXER_ID_ASC',
  RindexerIdDesc = 'RINDEXER_ID_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  TxIndexAsc = 'TX_INDEX_ASC',
  TxIndexDesc = 'TX_INDEX_DESC'
}

export type EloRatingWithPlacement = {
  __typename?: 'EloRatingWithPlacement';
  placement?: Maybe<Scalars['Int']['output']>;
  player?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['String']['output']>;
};

/** A filter to be used against `EloRatingWithPlacement` object types. All fields are combined with a logical ‘and.’ */
export type EloRatingWithPlacementFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EloRatingWithPlacementFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<EloRatingWithPlacementFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EloRatingWithPlacementFilter>>;
  /** Filter by the object’s `placement` field. */
  placement?: InputMaybe<IntFilter>;
  /** Filter by the object’s `player` field. */
  player?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rating` field. */
  rating?: InputMaybe<StringFilter>;
};

/** A connection to a list of `EloRatingWithPlacement` values. */
export type EloRatingWithPlacementsConnection = {
  __typename?: 'EloRatingWithPlacementsConnection';
  /** A list of edges which contains the `EloRatingWithPlacement` and cursor to aid in pagination. */
  edges: Array<EloRatingWithPlacementsEdge>;
  /** A list of `EloRatingWithPlacement` objects. */
  nodes: Array<Maybe<EloRatingWithPlacement>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EloRatingWithPlacement` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `EloRatingWithPlacement` edge in the connection. */
export type EloRatingWithPlacementsEdge = {
  __typename?: 'EloRatingWithPlacementsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EloRatingWithPlacement` at the end of the edge. */
  node?: Maybe<EloRatingWithPlacement>;
};

export type GameEvent = Node & {
  __typename?: 'GameEvent';
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['BigFloat']['output'];
  contractAddress: Scalars['String']['output'];
  gameId?: Maybe<Scalars['String']['output']>;
  logIndex: Scalars['String']['output'];
  network: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  player1?: Maybe<Scalars['String']['output']>;
  player2?: Maybe<Scalars['String']['output']>;
  rindexerId: Scalars['Int']['output'];
  state?: Maybe<Scalars['Int']['output']>;
  txHash: Scalars['String']['output'];
  txIndex: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `GameEvent` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type GameEventCondition = {
  /** Checks for equality with the object’s `blockHash` field. */
  blockHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Checks for equality with the object’s `contractAddress` field. */
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gameId` field. */
  gameId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `logIndex` field. */
  logIndex?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `network` field. */
  network?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `player1` field. */
  player1?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `player2` field. */
  player2?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rindexerId` field. */
  rindexerId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `state` field. */
  state?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `txIndex` field. */
  txIndex?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** A filter to be used against `GameEvent` object types. All fields are combined with a logical ‘and.’ */
export type GameEventFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GameEventFilter>>;
  /** Filter by the object’s `blockHash` field. */
  blockHash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `contractAddress` field. */
  contractAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `gameId` field. */
  gameId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `logIndex` field. */
  logIndex?: InputMaybe<StringFilter>;
  /** Filter by the object’s `network` field. */
  network?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<GameEventFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GameEventFilter>>;
  /** Filter by the object’s `player1` field. */
  player1?: InputMaybe<StringFilter>;
  /** Filter by the object’s `player2` field. */
  player2?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rindexerId` field. */
  rindexerId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `state` field. */
  state?: InputMaybe<IntFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `txIndex` field. */
  txIndex?: InputMaybe<BigFloatFilter>;
};

/** A connection to a list of `GameEvent` values. */
export type GameEventsConnection = {
  __typename?: 'GameEventsConnection';
  /** A list of edges which contains the `GameEvent` and cursor to aid in pagination. */
  edges: Array<GameEventsEdge>;
  /** A list of `GameEvent` objects. */
  nodes: Array<Maybe<GameEvent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GameEvent` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `GameEvent` edge in the connection. */
export type GameEventsEdge = {
  __typename?: 'GameEventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `GameEvent` at the end of the edge. */
  node?: Maybe<GameEvent>;
};

/** Methods to use when ordering `GameEvent`. */
export enum GameEventsOrderBy {
  BlockHashAsc = 'BLOCK_HASH_ASC',
  BlockHashDesc = 'BLOCK_HASH_DESC',
  BlockNumberAsc = 'BLOCK_NUMBER_ASC',
  BlockNumberDesc = 'BLOCK_NUMBER_DESC',
  ContractAddressAsc = 'CONTRACT_ADDRESS_ASC',
  ContractAddressDesc = 'CONTRACT_ADDRESS_DESC',
  GameIdAsc = 'GAME_ID_ASC',
  GameIdDesc = 'GAME_ID_DESC',
  LogIndexAsc = 'LOG_INDEX_ASC',
  LogIndexDesc = 'LOG_INDEX_DESC',
  Natural = 'NATURAL',
  NetworkAsc = 'NETWORK_ASC',
  NetworkDesc = 'NETWORK_DESC',
  Player_1Asc = 'PLAYER_1_ASC',
  Player_1Desc = 'PLAYER_1_DESC',
  Player_2Asc = 'PLAYER_2_ASC',
  Player_2Desc = 'PLAYER_2_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RindexerIdAsc = 'RINDEXER_ID_ASC',
  RindexerIdDesc = 'RINDEXER_ID_DESC',
  StateAsc = 'STATE_ASC',
  StateDesc = 'STATE_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  TxIndexAsc = 'TX_INDEX_ASC',
  TxIndexDesc = 'TX_INDEX_DESC'
}

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `EloRatingEvent`. */
  allEloRatingEvents?: Maybe<EloRatingEventsConnection>;
  /** Reads and enables pagination through a set of `GameEvent`. */
  allGameEvents?: Maybe<GameEventsConnection>;
  /** Reads a single `EloRatingEvent` using its globally unique `ID`. */
  eloRatingEvent?: Maybe<EloRatingEvent>;
  eloRatingEventByRindexerId?: Maybe<EloRatingEvent>;
  /** Reads a single `GameEvent` using its globally unique `ID`. */
  gameEvent?: Maybe<GameEvent>;
  gameEventByRindexerId?: Maybe<GameEvent>;
  /** Reads and enables pagination through a set of `EloRatingWithPlacement`. */
  getLatestEloRatingsWithPlacement?: Maybe<EloRatingWithPlacementsConnection>;
  /** Reads and enables pagination through a set of `GameEvent`. */
  getLatestGameEvents?: Maybe<GameEventsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllEloRatingEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EloRatingEventCondition>;
  filter?: InputMaybe<EloRatingEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EloRatingEventsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllGameEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GameEventCondition>;
  filter?: InputMaybe<GameEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GameEventsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEloRatingEventArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEloRatingEventByRindexerIdArgs = {
  rindexerId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGameEventArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGameEventByRindexerIdArgs = {
  rindexerId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetLatestEloRatingsWithPlacementArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<EloRatingWithPlacementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetLatestGameEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GameEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetGamesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<GameEventFilter>;
}>;


export type GetGamesQuery = { __typename?: 'Query', getLatestGameEvents?: { __typename?: 'GameEventsConnection', totalCount: number, nodes: Array<{ __typename?: 'GameEvent', gameId?: string | null, player1?: string | null, player2?: string | null } | null> } | null };

export type GetChallengesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<GameEventFilter>;
}>;


export type GetChallengesQuery = { __typename?: 'Query', getLatestGameEvents?: { __typename?: 'GameEventsConnection', totalCount: number, nodes: Array<{ __typename?: 'GameEvent', gameId?: string | null, player1?: string | null, player2?: string | null } | null> } | null };

export type GetEloRatingsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<EloRatingWithPlacementFilter>;
}>;


export type GetEloRatingsQuery = { __typename?: 'Query', getLatestEloRatingsWithPlacement?: { __typename?: 'EloRatingWithPlacementsConnection', totalCount: number, nodes: Array<{ __typename?: 'EloRatingWithPlacement', player?: string | null, rating?: string | null, placement?: number | null } | null> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetGamesDocument = new TypedDocumentString(`
    query GetGames($first: Int, $offset: Int, $filter: GameEventFilter) {
  getLatestGameEvents(first: $first, offset: $offset, filter: $filter) {
    nodes {
      gameId
      player1
      player2
    }
    totalCount
  }
}
    `) as unknown as TypedDocumentString<GetGamesQuery, GetGamesQueryVariables>;
export const GetChallengesDocument = new TypedDocumentString(`
    query GetChallenges($first: Int, $offset: Int, $filter: GameEventFilter) {
  getLatestGameEvents(first: $first, offset: $offset, filter: $filter) {
    nodes {
      gameId
      player1
      player2
    }
    totalCount
  }
}
    `) as unknown as TypedDocumentString<GetChallengesQuery, GetChallengesQueryVariables>;
export const GetEloRatingsDocument = new TypedDocumentString(`
    query GetEloRatings($first: Int, $offset: Int, $filter: EloRatingWithPlacementFilter) {
  getLatestEloRatingsWithPlacement(
    first: $first
    offset: $offset
    filter: $filter
  ) {
    nodes {
      player
      rating
      placement
    }
    totalCount
  }
}
    `) as unknown as TypedDocumentString<GetEloRatingsQuery, GetEloRatingsQueryVariables>;