import { Injectable } from "@nestjs/common";
import UsersRepository from "./users.repository";
import { ICreateUserInterface } from "./interfaces/create-user.interface";


@Injectable()
export default class UsersServices {

    constructor(private _usersRepository: UsersRepository) { }


    async createUser(user: ICreateUserInterface) {
        try {
            const verifyUserExists = await this._usersRepository.findOneBy({ email: user.email })
        }
        catch (err) {

        }
    }
}