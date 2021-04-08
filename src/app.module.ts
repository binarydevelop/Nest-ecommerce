import {} from 'reflect-metadata'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [ TypeOrmModule.forRootAsync(typeOrmConfigAsync),
             UsersModule,
             AuthModule,
             OrdersModule,
             ProductsModule,
             WalletModule,
            ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule{}

/* -----------------------> Guarding using Middleware <--------------------- 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAdmin)
      .forRoutes('users');
  }
} */

 