import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { productsRepository } from 'src/products/entity/products.repository';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { UserRepository } from 'src/users/entity/user.repository';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { orderRepository } from './entity/orders.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ TypeOrmModule.forFeature(
            [orderRepository,
             productsRepository,
             UserRepository
            ]),
             AuthModule,
             ProductsModule,
             UsersModule
            ],
  controllers: [OrdersController],
  providers: [ProductsService,
              OrdersService,
              UsersService
           ]
})
export class OrdersModule {}
