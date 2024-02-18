import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Balance from "./balance.entity";
import { BalanceRepository } from "./balance.repository";




@Injectable()
export class BalanceServices {
    constructor(@InjectRepository(Balance) private _balanceRepository: BalanceRepository) { }
}