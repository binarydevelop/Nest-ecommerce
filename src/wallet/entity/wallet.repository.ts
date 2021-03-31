import { EntityRepository, Repository } from "typeorm";
import { wallet } from "./wallet.entity";

@EntityRepository(wallet)
export class walletRepository extends Repository<wallet>{
    
}