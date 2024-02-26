import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Transaction from "./transactions.entity";
import { TransactionsRepository } from "./transactions.repository";
import { ICreateTransactionInterface } from "./interfaces/create-transaction.interface";
import { AppResponse } from "src/application/AppResponse";
import { BalanceServices } from "../balance/balance.service";
import { ICreateDepositInterface } from "./interfaces/create-deposit.interface";

@Injectable()
export class TransactionsServices {

    constructor(
        @InjectRepository(Transaction)
        private _transactionsRepository: TransactionsRepository,
        private _balanceServices: BalanceServices
    ) { }


    async createTradeTransaction(data: ICreateTransactionInterface) {

        const createdTransaction = this._transactionsRepository.create(data)

        await this._transactionsRepository.save(createdTransaction)

        const toUpdate = {
            value: data.value,
            user_from: data.user_from,
            user_to: data.user_to,
            transaction_type: data.type
        }

        const applyTransaction = await this._balanceServices.applyTradeTransaction(toUpdate)


        return applyTransaction

    }


    async createDepositTransaction(data: ICreateDepositInterface) {
        const createdTransaction = this._transactionsRepository.create(data)
        await this._transactionsRepository.save(createdTransaction)


        const applyTransaction = await this._balanceServices.applyDepositTransaction({
            owner: data.user_to,
            value: data.value
        })

        return applyTransaction
    }

}