import { Body, Controller, Get, Logger, Post, Query, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserType } from 'src/common/enums/userType.enum';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { createOrderDto } from './dto/createOrder.dto';
import { orderRepository } from './entity/orders.repository';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard(), RolesGuard)
@UseFilters(HttpExceptionFilter)
export class OrdersController {
    constructor(private orderService: OrdersService) {}
    private readonly logger = new Logger('OrdersService');
    @Roles(UserType.BUYER)
    @Get()
    async getOwnOrders(@User() user){
        this.logger.verbose('Getting User Information.')
        return await this.orderService.getOwnOrders(user);
    }

    @Roles(UserType.BUYER)
    @Post('order')
    async placeOrder(@Body(ValidationPipe) orderDetails: createOrderDto, @User() user){
        this.logger.verbose('Placing Order')
        return await this.orderService.placeOrder(orderDetails, user);
    }
}





