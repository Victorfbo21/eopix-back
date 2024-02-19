import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ILoginRequestInterface } from "./interfaces/login-request.interface";




@Controller('/auth')
export class AuthController {

    constructor(private _authServices: AuthService) { }


    @Post('/login')
    async login(@Body() data: ILoginRequestInterface) {
        return this._authServices.login(data)
    }
}