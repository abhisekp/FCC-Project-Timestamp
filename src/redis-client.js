import redis from 'redis';

const getRedisClient = (opts = {}) => {
  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    ...opts,
  })
  
  return client
}

export default getRedisClient;