import { Body, Controller, Get, Post, RequestMapping } from "@nestjs/common";
import UsersServices from "./users.service";
import { ICreateUserInterface } from "./interfaces/create-user.interface";


@Controller('/users')
export default class UsersController {

    constructor(private _usersServices: UsersServices) { }


    @Post('/create')
    async createUser(@Body() data: ICreateUserInterface) {
        return await this._usersServices.createUser(data)
    }

    @Get('/')
    async getUsers() {
        return await this._usersServices.getUsers()
    }
}