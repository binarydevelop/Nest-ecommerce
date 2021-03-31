import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [AuthModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
