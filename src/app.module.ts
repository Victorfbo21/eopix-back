import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './modules/users/users.module';
import { BalanceModule } from './modules/balance/balance.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { authMiddleware } from './application/middlewares/authMiddleware'
import UsersController from './modules/users/users.controller';
import { TransactionsController } from './modules/transactions/transactions.controller';
import { BalanceController } from './modules/balance/balance.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    }),
    UsersModule,
    BalanceModule,
    TransactionsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware)
      .exclude({ path: 'users/create', method: RequestMethod.POST })
      .forRoutes(UsersController, BalanceController, TransactionsController)
  }

}
