import { Router } from 'express'

import { userRouter } from './routes/user.routes'

export const routes = () => {
    const app = Router()

    userRouter(app)

    return app
}