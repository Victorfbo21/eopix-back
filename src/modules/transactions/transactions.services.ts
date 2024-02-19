import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Transaction from "./transactions.entity";
import { TransactionsRepository } from "./transactions.repository";
import { ICreateTransactionInterface } from "./interfaces/create-transaction.interface";
import { AppResponse } from "src/application/AppResponse";




@Injectable()
export class TransactionsServices {

    constructor(@InjectRepository(Transaction) private _transactionsRepository: TransactionsRepository) { }


    async createTransaction(data: ICreateTransactionInterface) {

        const createdTransaction = await this._transactionsRepository.create(data)

        const savedTransaction = await this._transactionsRepository.save(createdTransaction)



        if (!savedTransaction) {
            return new AppResponse({
                    data: null,
                    error: true,
                    statusCode: 500,
                    message: "Erro ao Salvar Transação!"
                })
            }

            return new AppResponse({
                data: savedTransaction,
                error: false,
                statusCode: 200,
                message: "Transação Salva com Sucesso!"
            })

    }

}