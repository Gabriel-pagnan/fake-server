const { createClient } = require("redis");

let redis;

async function getRedis() {
    if (!redis) {
        redis = createClient({
            url: "redis://default:1j7ppuJv1ZWFSq0bZcOB1LBiIdEOq2H2@redis-18426.c246.us-east-1-4.ec2.cloud.redislabs.com:18426",
        });

        redis.on("error", (err) => {
        console.error("Redis Client Error", err);
        });

        await redis.connect();
    }

    return redis;
}

module.exports = { getRedis };