import { Request, Response, Router } from 'express'

import mongoService from '../../services/mongo.service'

import { verfiyToken } from '../../middlewares/auth.middleware'
import { IToken } from '../../interfaces/IToken'

const router = Router()

export const userRouter = (app: Router) => {
    app.use('/playback', router)

    router.post('/my', verfiyToken, async (req: Request, res: Response) => {

        const { userId } = req.body as IToken

        try {

            return res.status(200).json(await mongoService.getFilms(userId))

        } catch (err) {
            res.sendStatus(400)
        }
    })
}