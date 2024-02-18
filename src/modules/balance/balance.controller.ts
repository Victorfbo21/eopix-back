import { Controller } from "@nestjs/common";
import { BalanceServices } from "./balance.service";




@Controller('/balance')

export class BalanceController {
    constructor(private _balanceServices: BalanceServices) { }
}