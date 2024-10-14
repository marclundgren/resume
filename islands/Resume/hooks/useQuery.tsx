import React, { type ReactNode } from "preact/compat";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { createContext } from "preact";

interface QueryOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
}

interface QueryResult<T> {
  isPending: boolean;
  error: Error | null;
  data: T | null;
}

export interface QueryClient {
  cache: Record<string, unknown>;
  fetch: <T>(key: string[], queryFn: () => Promise<T>) => Promise<T>;
}

const QueryClientContext = createContext<QueryClient | null>(null);

export class QueryClient {
  cache: Record<string, unknown> = {};

  async fetchData<T>(key: string[], queryFn: () => Promise<T>): Promise<T> {
    const cacheKey = key.join("-");
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey] as T;
    }
    const result = await queryFn();
    this.cache[cacheKey] = result;
    return result;
  }
}

interface QueryClientProviderProps {
  client: QueryClient;
  children: ReactNode;
}

export const QueryClientProvider: React.FC<QueryClientProviderProps> = (
  { client, children },
) => {
  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
};

export function useQuery<T>(
  { queryKey, queryFn }: QueryOptions<T>,
): QueryResult<T> {
  const queryClient = useContext(QueryClientContext);
  if (!queryClient) {
    throw new Error("useQuery must be used within a QueryClientProvider");
  }

  const queryClientRef = useRef(queryClient);
  queryClientRef.current = queryClient;

  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const stringifiedQueryKey = JSON.stringify(queryKey);
  const memoizedQueryFn = useCallback(queryFn, [queryFn]);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setError(null);
      try {
        const result = await queryClientRef.current.fetchData(
          queryKey,
          memoizedQueryFn,
        );
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [stringifiedQueryKey, memoizedQueryFn]);

  return { isPending, error, data };
}

export function parseResponse<T>(response: Response): Promise<T> {
  return response.json();
}
