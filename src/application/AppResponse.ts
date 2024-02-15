import { HttpResponseInterface } from "./AppResponse.interface";

export class AppResponse {
    public readonly data: any
    public readonly error: boolean
    public readonly statusCode: number
    public readonly message: string

    constructor(ObjectAppResponse: HttpResponseInterface) {
        this.data = ObjectAppResponse.data,
            this.error = ObjectAppResponse.error,
            this.statusCode = ObjectAppResponse.statusCode,
            this.message = ObjectAppResponse.message

    }
}

