import { Body, Controller, Get, Inject, Patch, Post, Request } from "@nestjs/common";
import { TransactionsServices } from "./transactions.services";
import { ICreateTransactionInterface } from "./interfaces/create-transaction.interface";
import { ICreateDepositInterface } from "./interfaces/create-deposit.interface";



@Controller('/transactions')
export class TransactionsController {

    constructor(private _transactionsServices: TransactionsServices) { }

    @Post('/create/trade')
    async createTradeTransaction(@Body() data: ICreateTransactionInterface) {
        return this._transactionsServices.createTradeTransaction(data)
    }

    @Post('/create/deposit')
    async createDepositTransaction(@Body() data: ICreateDepositInterface, @Request() request) {
        const { user } = request
        const object = {
            value: data.value,
            user_from: data.user_from,
            type: data.type,
            user_to: user.id
        }

        return this._transactionsServices.createDepositTransaction(object)
    }

    @Post('/create/withdrawal')
    async createWithdrawalTransaction() {

    } 

    @Get()
    async transactionByUser() {

    }

    @Patch()
    async updateTransactionStatus() {

    }
}