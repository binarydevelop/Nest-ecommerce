import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productsRepository } from 'src/products/entity/products.repository';
import { ProductsService } from 'src/products/products.service';
import { orderRepository } from './entity/orders.repository';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(orderRepository)
        private readonly orderRepository: orderRepository,
        private productService: ProductsService) {}
        private logger =  new Logger();
    async getOwnOrders(user){
        if(user.orders.length > 0){
            return user.orders;
        }else{
            throw new HttpException('No orders yet.', HttpStatus.EXPECTATION_FAILED)
        }  
    }
    
    async placeOrder(orderDetails, user){
        try{
            const {productName, quantity} = orderDetails;
            const productExist =  await this.productService.findProductByTitle(productName)
            if(productExist){
                return this.orderRepository.placeOrder(productName, quantity, productExist, user);
            }else{
                return({error: 'Product Not Found.', status: 'Order Unsuccessful' })
            }
        }
        catch(err){
            this.logger.log(err);
            return ({error: err.message})
        }
    }



}
