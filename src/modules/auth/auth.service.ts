import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "../users/users.entity";
import UsersRepository from "../users/users.repository";
import { ILoginRequestInterface } from "./interfaces/login-request.interface";
import { comparePassword } from '../../application/utils/comparePassword'
import { AppResponse } from "src/application/AppResponse";
import { getTokenValid } from '../../application/utils/validAtToken'
import TokenService from "./token.service";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private _userRepository: UsersRepository,


        private _tokenService: TokenService
    ) { }


    async login(loginData: ILoginRequestInterface) {
        const user = await this._userRepository.findOneBy({ email: loginData.email })
        if (!user) {
            return new AppResponse({
                data: null,
                error: true,
                statusCode: 404,
                message: 'Usuário não encontrado na base dados'
            })
        }

        const passwordCompared = comparePassword(loginData.password, user.password)

        if (!passwordCompared) {
            return new AppResponse({
                data: null,
                error: true,
                statusCode: 400,
                message: "Senha Inválida"
            })
        }

        const requestTokenData = {
            userId: user.id,
            type: user.role
        }

        const genenateTokens = await this._tokenService.getToken(requestTokenData)

        if (!genenateTokens) {
            return new AppResponse({
                data: null,
                error: true,
                statusCode: 500,
                message: 'Erro ao Gerar Tokens'
            })
        }

        return new AppResponse({
            data: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                accessToken: genenateTokens.accessToken,
                refreshToken: genenateTokens.refreshToken,
                validAt: getTokenValid()
            },
            error: false,
            statusCode: 200,
            message: 'Logado com Sucesso!'
        })

    }
}