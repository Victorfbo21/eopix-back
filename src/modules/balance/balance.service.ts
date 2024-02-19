import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Balance from "./balance.entity";
import { BalanceRepository } from "./balance.repository";
import { UpdateBalanceDto } from "./dtos/update-balance.dto";
import { TransactionType } from "../transactions/transactions.entity";
import UsersServices from "../users/users.service";
import { AppResponse } from "src/application/AppResponse";




@Injectable()
export class BalanceServices {
    constructor(
        @InjectRepository(Balance)
        private _balanceRepository: BalanceRepository,
        private _usersServices: UsersServices

    ) { }


    async updateBalance(updateData: UpdateBalanceDto) {
        const isWithdrawal = updateData.transaction_type === TransactionType.OUT

        const transaction = this._balanceRepository.manager.transaction(async (transactionalEntityManager) => {

            const user_from_balance = await transactionalEntityManager.findOneBy(Balance, { owner: updateData.user_from })

            const user_to_balance = await transactionalEntityManager.findOneBy(Balance, { owner: updateData.user_to })

            if (isWithdrawal) {
                const valueIsValid = user_from_balance.value >= updateData.value
                if (!valueIsValid) {
                    return new AppResponse({
                        data: null,
                        error: true,
                        statusCode: 402,
                        message: "Saldo Insuficiente"
                    })
                }
            }

        })
    }
}