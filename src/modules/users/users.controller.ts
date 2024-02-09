import { Controller, RequestMapping } from "@nestjs/common";
import UsersServices from "./users.service";




@Controller('/users')
export default class UsersController {

    constructor(private _usersServices: UsersServices) { }
}