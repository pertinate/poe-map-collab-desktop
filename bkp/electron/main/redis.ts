import { createClient } from 'redis';

export const redisClient = createClient({
    url: 'redis://192.168.0.250:6379',

})

export const startRedis = async () => {
    await redisClient
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
}