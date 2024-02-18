import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Transaction from './transactions.entity';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsServices } from './transactions.services';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, TransactionsRepository])],
    controllers: [TransactionsController],
    providers: [TransactionsServices],
    exports: [TransactionsServices]
})
export class TransactionsModule { }
