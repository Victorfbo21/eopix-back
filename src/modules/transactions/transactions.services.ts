import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Transaction from "./transactions.entity";
import { TransactionsRepository } from "./transactions.repository";




@Injectable()
export class TransactionsServices {

    constructor(@InjectRepository(Transaction) private _transactionsRepository: TransactionsRepository) { }


}