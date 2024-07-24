import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

const redis = new Redis({
  port: 15742, // Redis port
  host: "redis-15742.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

// redis-cli -u redis://default:OfQ5hqvbb9c2H3HNQJjmdwqovjq3Xiw3@redis-15742.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com:15742

export default redis;
