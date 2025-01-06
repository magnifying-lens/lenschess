import request from "graphql-request";
import type { TypedDocumentString } from "./graphql";
import { useQuery } from "@tanstack/react-query";

async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables
) {
  return (await request(import.meta.env.VITE_API_URL, query.toString(), {
    ...variables,
  })) as TResult;
}
export function useCustomQuery<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables,
  options?: {
    refetchInterval?: number;
    skip?: boolean;
  }
) {
  const queryKey = [query.toString(), variables];

  return useQuery<TResult>({
    queryKey,
    queryFn: () => execute(query, variables),
    refetchInterval: options?.refetchInterval,
    enabled: !options?.skip,
  });
}
