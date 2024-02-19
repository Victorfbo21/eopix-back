import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import TokenService from './token.service';
import UsersRepository from '../users/users.repository';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, TokenService],
    exports: []
})
export class AuthModule { }
