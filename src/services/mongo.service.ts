import { Types } from 'mongoose'

import Playback from '../models/Playback'

import { IPlaybackUser } from '../interfaces/data/IPlayback'

async function saveToDb (data: IPlaybackUser) {
    try {

        await Playback.updateMany(
            {
                userId: Types.ObjectId(data.userId),
                filmId: Types.ObjectId(data.filmId)
            },
            {
                time: data.time
            },
            {
                upsert: true
            }
        )
         
    } catch (err) {
        throw err
    }
}

async function getFilms (userId: string) {
    try {

        return await Playback.find(
            { 
                userId 
            },
            {
                filmId: 1,
                time: 1
            }
        )

    } catch (err) {
        throw err
    }

}

export default ({
    saveToDb,
    getFilms
})