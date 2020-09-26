import dotenv from 'dotenv'

const env = dotenv.config()

if(env.error) {
    throw new Error('No .env')
}

export const PORT = process.env.PORT 
export const MONGO_URL = process.env.MONGO_URL!
export const SECRET_JWT = process.env.SECRET_TOKEN