import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { ok } from "node:assert";
import { productsEntity } from "src/products/entity/products.entity";
import { userEntity } from "src/users/entity/user.entity";
import { wallet } from "src/wallet/entity/wallet.entity";
import { EntityRepository, getConnection, getRepository, Repository } from "typeorm";
import { newOrderDto } from "../dto/newOrder.dto";
import { ordersEntity } from "./orders.entity";

@EntityRepository(ordersEntity)
export class orderRepository extends Repository<ordersEntity>{
    logger = new Logger();
    async placeOrder(productName, quantity, productExist, user){
        try{
            const totalPrice = quantity * productExist.price;
            if(quantity > productExist.quantity){
                return new HttpException('Quantity Not Avialable.', HttpStatus.BAD_REQUEST)
            }
            if(totalPrice > user.wallet.balance){
                return new HttpException('Insufficient Funds', HttpStatus.BAD_REQUEST)
            }
            user.wallet.balance -= totalPrice;
            productExist.units -= quantity;
            const seller = await userEntity.findOne({username: productExist.soldBy})
            seller.wallet.balance+= totalPrice
            await userEntity.save(user);
            await productsEntity.save(productExist);
            await userEntity.save(seller);
            const newOrder = new ordersEntity();
            newOrder.totalPrice = totalPrice;
            newOrder.quantity = quantity;
            newOrder.product = productName;
            newOrder.user = user;
            newOrder.save();
            return({message: 'Order Placed Successfully', status: 201 })
        }
        catch(err){
            this.logger.log(err);
            return new HttpException('Failed Placing Order', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }





}