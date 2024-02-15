import { Injectable } from "@nestjs/common";
import UsersRepository from "./users.repository";
import { ICreateUserInterface } from "./interfaces/create-user.interface";
import { AppResponse } from "src/application/AppResponse";

@Injectable()
export default class UsersServices {

    constructor(private _usersRepository: UsersRepository) { }


    async createUser(user: ICreateUserInterface) {
        try {
            const verifyUserExists = await this._usersRepository.findOneBy({ email: user.email })
            if (verifyUserExists) {
                return new AppResponse({
                    data: null,
                    error: true,
                    statusCode: 400,
                    message: "Usuário ja Cadastrado"
                })
            }


        }
        catch (err) {

        }
    }
}