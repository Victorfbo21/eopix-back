import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './users.entity';
import UsersRepository from './users.repository';
import UsersController from './users.controller';
import UsersServices from './users.service';
import { BalanceModule } from '../balance/balance.module';


@Module({
    imports: [TypeOrmModule.forFeature([User, UsersRepository]) , BalanceModule],
    controllers: [UsersController],
    providers: [UsersServices],
    exports: [UsersServices, TypeOrmModule.forFeature([UsersRepository])]
})
export class UsersModule { }
