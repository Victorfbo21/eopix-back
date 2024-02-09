import { Injectable } from "@nestjs/common";
import UsersRepository from "./users.repository";




@Injectable()
export default class UsersServices {

    constructor(private _usersRepository: UsersRepository) { }
}