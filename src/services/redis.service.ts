import redis from 'redis'

import { IPlaybackData } from '../interfaces/data/IPlayback'

import { jwtDecoder } from '../utils/utils'

const client = redis.createClient()

client.on('error', err => console.log(err))


function createRedisKey (data: IPlaybackData) {
    const { userId } = jwtDecoder(data.token)

    return data._id.concat('_', userId)
}


function saveToRedis (redisKey: string, value: number) {
    client.set(redisKey, value.toString())
}


function getKeys () {
    return new Promise<Array<string>>((resolve, reject) => {
        client.scan('', 'MATCH', '*', 'COUNT', '5', (err, keys) => {
            if(err) reject(err)

            resolve(keys[1])
        })
    })
}


async function removeKeys () {
    client.flushall((err, success) => {
        if(err) return console.log(err)

        console.log(success)
    })
}

 
async function dataForDb (saveToMongo: (data: any) => void) {

    const keys = await getKeys()

    keys.map(item => {

        const splited = item.split('_')

        client.get(item, (err, time)  => {
            if(err) console.log(err)

            const data = Object.assign(
                {
                    filmId: splited[0],
                    userId: splited[1]
                }, 
                {
                    time
                }
            )

            saveToMongo(data)
        })
    }) 
}


export default ({
    saveToRedis,
    createRedisKey,
    getKeys,
    removeKeys,
    dataForDb
})