const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

async function connectRedis() {
  // Make this an async function
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    process.exit(1); 
  }
}

module.exports = { redisClient, connectRedis };
