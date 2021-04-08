import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productsRepository } from 'src/products/entity/products.repository';
import { ProductsService } from 'src/products/products.service';
import { orderRepository } from './entity/orders.repository';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(orderRepository)
        private readonly orderRepository: orderRepository,) {}

    async getOwnOrders(user){
        if(user.orders.length > 0){
            return user.orders;
        }else{
            throw new HttpException('No orders yet.', HttpStatus.EXPECTATION_FAILED)
        }  
    }
 
}
