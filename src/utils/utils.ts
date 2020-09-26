import decoder from 'jwt-decode' 

import { IToken } from '../interfaces/IToken'

export const jwtDecoder = (token: string): IToken => decoder(token)
