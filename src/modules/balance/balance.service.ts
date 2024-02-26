import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Balance from "./balance.entity";
import { BalanceRepository } from "./balance.repository";
import { UpdateBalanceDto } from "./dtos/update-balance.dto";
import { TransactionType } from "../transactions/transactions.entity";
import { AppResponse } from "src/application/AppResponse";




@Injectable()
export class BalanceServices {
    constructor(
        @InjectRepository(Balance)
        private _balanceRepository: BalanceRepository,
    ) { }


    async applyTradeTransaction(updateData: UpdateBalanceDto): Promise<AppResponse> {

        const result = await this._balanceRepository.manager.transaction(async (transactionalEntityManager) => {
            const user_from_balance = await transactionalEntityManager.findOneBy(Balance, { owner: updateData.user_from });
            const user_to_balance = await transactionalEntityManager.findOneBy(Balance, { owner: updateData.user_to });

            const valueIsValid = updateData.value >= user_from_balance.value
            console.log(valueIsValid)
            if (valueIsValid) {
                return new AppResponse({
                    data: null,
                    error: true,
                    statusCode: 500,
                    message: "Saldo Insuficiente"
                })
            }

            user_from_balance.value -= updateData.value;
            await transactionalEntityManager.save(user_from_balance);


            user_to_balance.value += updateData.value;
            await transactionalEntityManager.save(user_to_balance);

            return new AppResponse({
                data: result,
                error: false,
                statusCode: 200,
                message: "Operação Realizada com Sucesso!"
            })
        });

        return result
    }

    async createBalance(owner: string) {

        const created = this._balanceRepository.create({ owner: owner, value: 0 })

        const saved = await this._balanceRepository.save(created)

        if (!saved) {
            return new AppResponse({
                data: null,
                error: true,
                statusCode: 500,
                message: "Erro Ao Criar Carteira"
            })
        }

        return new AppResponse({
            data: saved,
            error: false,
            statusCode: 200,
            message: "Carteira Criada com Sucesso!"
        })
    }

    async applyDepositTransaction(depositData: { owner: string, value: number }) {
        const balance = await this._balanceRepository.findOneBy({ owner: depositData.owner })

        balance.value += depositData.value

        const updateBalance = await this._balanceRepository.save(balance)

        if (!updateBalance) {
            return new AppResponse({
                data: null,
                error: true,
                statusCode: 500,
                message: 'Erro ao Realizar Deposíto'
            })
        }

        return new AppResponse({
            data: balance.id,
            error: false,
            statusCode: 200,
            message: 'Depósito Realizado com Sucesso!'
        })

    }

    async applyWithdrawalTransaction(withdrawalData: { owner: string, value: number }) {

        const balance = await this._balanceRepository.findOneBy({ owner: withdrawalData.owner })

        balance.value -= withdrawalData.value

        const updateBalance = await this._balanceRepository.save(balance)

        if (!updateBalance) {
            return new AppResponse({
                data: null,
                error: true,
                statusCode: 500,
                message: 'Erro ao Realizar Retirada'
            })
        }

        return new AppResponse({
            data: updateBalance.id,
            error: false,
            statusCode: 200,
            message: 'Retirada Feita com Sucesso!'
        })
    }

}