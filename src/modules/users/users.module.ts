import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './users.entity';
import UsersRepository from './users.repository';
import UsersController from './users.controller';
import UsersServices from './users.service';


@Module({
    imports: [TypeOrmModule.forFeature([User, UsersRepository])],
    controllers: [UsersController],
    providers: [UsersServices],
    exports: [UsersServices]
})
export class UsersModule { }
