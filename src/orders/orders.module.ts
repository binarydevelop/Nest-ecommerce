import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';
import { orderRepository } from './entity/orders.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ TypeOrmModule.forFeature([orderRepository]),
             AuthModule,
            ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
