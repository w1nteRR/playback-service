import cron from 'node-cron'

import redisService from '../services/redis.service'
import mongoService from '../services/mongo.service'

cron.schedule('* * * * *', async () => {
    try {
        
        const keys = await redisService.getKeys()

        if(!keys.length) return

        await redisService.dataForDb(data => mongoService.saveToDb(data))
        await redisService.removeKeys()
        
    } catch (err) {
        console.log(err)
    }
})