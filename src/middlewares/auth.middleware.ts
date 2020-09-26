import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { SECRET_JWT } from '../config/config'

import { IToken } from '../interfaces/IToken'

export const verfiyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) return res.sendStatus(401)

    jwt.verify(token, SECRET_JWT as string, (err, decoded) => {
        if(err) return res.sendStatus(401)

        const { userId } = decoded as IToken

        Object.assign(req.body, {
            userId
        })

        next()
    })   
}