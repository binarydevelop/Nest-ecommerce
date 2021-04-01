import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserType } from 'src/common/enums/userType.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { orderRepository } from './entity/orders.repository';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard(), RolesGuard)
export class OrdersController {
    constructor(private orderService: OrdersService) {}

    @Roles(UserType.BUYER)
    @Get()
    async getOwnOrders(@User() user){
        return this.orderService.getOwnOrders(user);
    }
}



