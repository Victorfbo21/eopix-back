import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import Balance from "./balance.entity";


@Injectable()
export class BalanceRepository extends Repository<Balance> { }