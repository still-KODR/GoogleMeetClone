const {createClient}=require("redis")

const redis=createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
    
})
redis.on('error', err => console.log('Redis Client Error', err));

(async()=>{

await redis.connect();
})()

module.exports=redis