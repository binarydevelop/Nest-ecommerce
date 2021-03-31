import { EntityRepository, Repository } from "typeorm";
import { ordersEntity } from "./orders.entity";

@EntityRepository(ordersEntity)
export class orderRepository extends Repository<ordersEntity>{
    
}