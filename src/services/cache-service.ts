type CacheItem<T> = {
    value: T;
    timestamp: number;
    key: string;
};

class CacheService {
    private static instance: CacheService;
    private cache: Map<string, CacheItem<any>>;
    private readonly defaultTTL: number = 5 * 60 * 1000;

    private constructor() {
        this.cache = new Map();
        setInterval(() => this.cleanup(), 60 * 1000);
    }

    static getInstance(): CacheService {
        if (!CacheService.instance) CacheService.instance = new CacheService();
        return CacheService.instance;
    }

    set<T>(key: string, value: T, ttl: number = this.defaultTTL): void {
        this.cache.set(key, {
            value,
            timestamp: Date.now() + ttl,
            key,
        });
    }

    get<T>(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.timestamp) {
            this.cache.delete(key);
            return null;
        }

        return item.value as T;
    }

    has(key: string): boolean {
        const item = this.cache.get(key);
        if (!item) return false;

        if (Date.now() > item.timestamp) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    private cleanup(): void {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now > item.timestamp) {
                this.cache.delete(key);
            }
        }
    }

    invalidateByPrefix(prefix: string): void {
        for (const [key] of this.cache.entries()) {
            if (key.startsWith(prefix)) this.cache.delete(key);
        }
    }

    invalidateByCollection(collectionId: string): void {
        this.invalidateByPrefix(collectionId);
    }
}

const cacheService = CacheService.getInstance();

export type { CacheItem };
export default cacheService;
