// Simple in-memory cache implementation
const cache = new Map();

module.exports = {
  async get(key) {
    const item = cache.get(key);
    if (!item) return null;
    
    if (item.expires && item.expires < Date.now()) {
      cache.delete(key);
      return null;
    }
    
    return item.value;
  },
  
  async set(key, value, { ttl } = {}) {
    cache.set(key, {
      value,
      expires: ttl ? Date.now() + ttl * 1000 : undefined
    });
  },
  
  async delete(key) {
    return cache.delete(key);
  }
};
