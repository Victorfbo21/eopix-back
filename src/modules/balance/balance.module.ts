import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Balance from './balance.entity';
import { BalanceRepository } from './balance.repository';
import { BalanceController } from './balance.controller';
import { BalanceServices } from './balance.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Balance, BalanceRepository]), UsersModule],
    controllers: [BalanceController],
    providers: [BalanceServices],
    exports: [BalanceServices]
})
export class BalanceModule { }
