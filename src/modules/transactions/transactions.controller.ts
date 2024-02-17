import { Controller, Inject, Post } from "@nestjs/common";
import { TransactionsServices } from "./transactions.services";



@Controller('/transactions')
export class TransactionsController {

    constructor(private _transactionsServices: TransactionsServices) { }

    @Post('/create')
    async createTransaction() {

    }
}