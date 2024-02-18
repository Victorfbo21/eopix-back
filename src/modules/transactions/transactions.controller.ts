import { Body, Controller, Get, Inject, Patch, Post } from "@nestjs/common";
import { TransactionsServices } from "./transactions.services";
import { ICreateTransactionInterface } from "./interfaces/create-transaction.interface";



@Controller('/transactions')
export class TransactionsController {

    constructor(private _transactionsServices: TransactionsServices) { }

    @Post('/create')
    async createTransaction(@Body() data: ICreateTransactionInterface) {
        return this._transactionsServices.createTransaction(data)
    }

    @Get()
    async transactionByUser() {

    }

    @Patch()
    async updateTransactionStatus() {

    }
}