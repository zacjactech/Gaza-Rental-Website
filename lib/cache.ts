// Temporary cache implementation without redis dependency
// In production, this would be replaced with a proper Redis implementation

type CacheOptions = {
  key: string;
  duration: number;
  invalidatePattern?: string;
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

// In-memory cache
const cache = new Map<string, { data: any; expires: number }>();

export const withCache = (handler: Function, options: CacheOptions) => {
  return async (req: Request, ...rest: any[]) => {
    // For development, just pass through to the handler
    return handler(req, ...rest);
  };
};

export const withRateLimit = (handler: Function, options: RateLimitOptions) => {
  return async (req: Request, ...rest: any[]) => {
    // For development, just pass through to the handler
    return handler(req, ...rest);
  };
};

export const invalidateCache = async (pattern: string) => {
  // For development, this is a no-op
  return;
};

export const getFromCache = async (key: string) => {
  const item = cache.get(key);
  if (!item) return null;
  if (item.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return item.data;
};

export const setInCache = async (key: string, data: any, duration: number) => {
  cache.set(key, {
    data,
    expires: Date.now() + duration * 1000,
  });
};

export const deleteFromCache = async (key: string) => {
  cache.delete(key);
}; 