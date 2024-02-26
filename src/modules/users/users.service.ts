import { Injectable } from "@nestjs/common";
import UsersRepository from "./users.repository";
import { ICreateUserInterface } from "./interfaces/create-user.interface";
import { AppResponse } from "src/application/AppResponse";
import { encodePassword } from "../../application/utils/encodePassword";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./users.entity";
import { BalanceServices } from "../balance/balance.service";

@Injectable()
export default class UsersServices {

    constructor(
        @InjectRepository(User) 
        private _usersRepository: UsersRepository,
        private _balanceService : BalanceServices
        ) { }


    async createUser(user: ICreateUserInterface) {
        const verifyUserExists = await this._usersRepository.findOneBy({ email: user.email })
        if (verifyUserExists) {
            return new AppResponse({
                data: null,
                error: true,
                statusCode: 400,
                message: "Usuário ja Cadastrado"
            })
        }
        user.password = encodePassword(user.password)

        const created = this._usersRepository.create(user)

        const save = await this._usersRepository.save(created)

        const createBalance = await this._balanceService.createBalance(save.id)

    
        if(!createBalance){
            return new AppResponse({
                data : null,
                error : true,
                statusCode : 500,
                message : 'Erro criar Carteira'
            })
        }

        return new AppResponse({
            data: save,
            error: false,
            statusCode: 201,
            message: "Usuário Criado com Sucesso!"
        })
    }

    async getUsers() {

        const usersFind = await this._usersRepository.find()

        if (!usersFind) {
            return new AppResponse({
                data: null,
                error: true,
                statusCode: 500,
                message: "Erro ao Encontrar Usuários!"
            })
        }
        return new AppResponse({
            data: usersFind,
            error: false,
            statusCode: 200,
            message: "Usuários Encontrados com Sucesso!"
        })
    }
}