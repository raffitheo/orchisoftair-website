/* eslint-disable @typescript-eslint/no-explicit-any */

import { client, databases } from '@config/appwrite';
import env from '@config/env';
import { type DataStatus } from '@interfaces/data-status';
import cacheService from '@services/cache-service';
import React from 'react';

interface UseAppwriteQueryOptions<T> {
    cache?: boolean;
    cacheTTL?: number;
    collectionId: string;
    enabled?: boolean;
    forceRefresh?: boolean;
    queries?: string[];
    transform?: (data: any) => T;
}

function useAppwriteQuery<T>({
    cache = true,
    cacheTTL,
    collectionId,
    enabled = true,
    forceRefresh = false,
    queries = [],
    transform,
}: UseAppwriteQueryOptions<T>) {
    const [data, setData] = React.useState<T[]>([]);
    const [status, setStatus] = React.useState<DataStatus>('initialized');
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        if (!enabled) return;

        async function fetchData() {
            try {
                const cacheKey = `${collectionId}-${JSON.stringify(queries)}`;

                if (cache && !forceRefresh) {
                    const cachedData = cacheService.get<T[]>(cacheKey);
                    if (cachedData) {
                        setData(cachedData);
                        setStatus('success');
                        return;
                    }
                }

                setStatus('loading');
                const response = await databases.listDocuments(
                    env.project.databaseId,
                    collectionId,
                    queries,
                );

                if (response?.documents?.length) {
                    const transformedData = transform
                        ? response.documents.map(transform)
                        : (response.documents as T[]);

                    if (cache)
                        cacheService.set(cacheKey, transformedData, cacheTTL);

                    setData(transformedData);
                    setStatus('success');
                } else setStatus('error-no-data');
            } catch (err) {
                setStatus('error');
                setError(
                    err instanceof Error ? err : new Error('Unknown error'),
                );
            }
        }

        const unsubscribe = client.subscribe(
            `databases.${env.project.databaseId}.collections.${collectionId}.documents`,
            (response) => {
                if (
                    response.events.includes(
                        'databases.*.collections.*.documents.*.create',
                    ) ||
                    response.events.includes(
                        'databases.*.collections.*.documents.*.update',
                    ) ||
                    response.events.includes(
                        'databases.*.collections.*.documents.*.delete',
                    )
                ) {
                    cacheService.invalidateByCollection(collectionId);

                    fetchData();
                }
            },
        );

        fetchData();

        return () => {
            unsubscribe();
        };
    }, [
        cache,
        cacheTTL,
        collectionId,
        enabled,
        forceRefresh,
        queries,
        transform,
    ]);

    return { data, status, error };
}

export type { UseAppwriteQueryOptions };
export default useAppwriteQuery;
