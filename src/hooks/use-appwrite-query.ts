import { databases } from '@config/appwrite';
import { type DataStatus } from '@interfaces/data-status';
import { useState, useEffect, useRef } from 'react';

interface UseAppwriteQueryOptions<T> {
    collectionId: string;
    queries?: string[];
    transform?: (data: any) => T;
    enabled?: boolean;
}

function useAppwriteQuery<T>({
    collectionId,
    queries = [],
    transform,
    enabled = true,
}: UseAppwriteQueryOptions<T>) {
    const [data, setData] = useState<T[]>([]);
    const [status, setStatus] = useState<DataStatus>('initialized');
    const [error, setError] = useState<Error | null>(null);

    const previousQueriesRef = useRef<string[]>([]);
    const previousCollectionIdRef = useRef<string>('');

    useEffect(() => {
        if (!enabled) return;

        const queriesChanged =
            JSON.stringify(previousQueriesRef.current) !==
            JSON.stringify(queries);
        const collectionIdChanged =
            previousCollectionIdRef.current !== collectionId;

        if (
            !queriesChanged &&
            !collectionIdChanged &&
            previousCollectionIdRef.current !== ''
        )
            return;

        previousQueriesRef.current = queries;
        previousCollectionIdRef.current = collectionId;

        async function fetchData() {
            try {
                setStatus('loading');
                const response = await databases.listDocuments(
                    import.meta.env.VITE_DATABASE_ID,
                    collectionId,
                    queries,
                );

                if (response?.documents?.length) {
                    setStatus('success');
                    if (transform) setData(response.documents.map(transform));
                    else setData(response.documents as T[]);
                } else setStatus('error-no-data');
            } catch (err) {
                setStatus('error');
                setError(
                    err instanceof Error ? err : new Error('Unknown error'),
                );
            }
        }

        fetchData();
    }, [collectionId, queries, transform, enabled]);

    return { data, status, error };
}

export type { UseAppwriteQueryOptions };
export default useAppwriteQuery;
