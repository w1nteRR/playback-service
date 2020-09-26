import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import { PORT, MONGO_URL } from './config/config'

import redisService from './services/redis.service'
import './services/cron.service'

import { routes } from './api/api'

import { IPlaybackData } from './interfaces/data/IPlayback'

const app = express()

app.use(bodyParser.json())
app.use(express.json())

app.use(routes())

const server = http.createServer(app)
const io = socketio(server, {
    handlePreflightRequest: (req: any, res: any) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Credentials": true
        }

        res.writeHead(200, headers)
        res.end()
    }
})


io.on('connection', socket => {

    let key: string

    console.log('connected')

    socket.on('playbackData', (data: IPlaybackData) => {
        key = redisService.createRedisKey(data)
    })

    socket.on('playbackProgress', (playbackTime: number) => redisService.saveToRedis(key, playbackTime))
})


async function run () {
    try {

        await mongoose.connect(MONGO_URL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }

        server.listen(PORT, () => console.log(`service on port ${PORT}`))

    } catch (err) {
        console.log(err)
    }
}

run()





