import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Transaction from './transactions.entity';


@Injectable()
export class TransactionsRepository extends Repository<Transaction>{ }