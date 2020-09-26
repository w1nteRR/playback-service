import mongoose, { Schema, Document } from 'mongoose'

import { IPlaybackData } from '../interfaces/data/IPlayback'

const PlaybackSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId
	},
	filmId: {
		type: Schema.Types.ObjectId
	},
	time: {
		type: String
	}
})

export default mongoose.model<IPlaybackData & Document>('Playback', PlaybackSchema)