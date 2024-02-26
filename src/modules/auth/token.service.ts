import { Injectable } from '@nestjs/common';
import { TokenRequestDto } from './dtos/token-request.dto';

const jwt = require('jsonwebtoken')
const Secret = require('jsonwebtoken')

@Injectable()
export default class TokenService {

    private secret: typeof Secret;
    private tokenLife: string | undefined
    private refreshTokenLife: string | undefined

    constructor() {
        this.secret = process.env.TOKEN_APP_SECRET || ""
        this.tokenLife = process.env.TOKEN_EXPIRATION
        this.refreshTokenLife = process.env.REFRESH_TOKEN_EXPIRATION
    }

    async getToken(tokenData: TokenRequestDto) {

        const accessToken = jwt.sign(tokenData, this.secret, { expiresIn: this.tokenLife })

        const refreshToken = jwt.sign(tokenData, this.secret, { expiresIn: this.refreshTokenLife })

        return {
            accessToken,
            refreshToken
        }
    }


}