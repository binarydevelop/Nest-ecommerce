import { BadRequestException, HttpException, HttpStatus, InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CategoryService } from "../category.service";
import { category } from "./category.entity";
import { categoryRepository } from "./category.repository";
import { productsEntity } from "./products.entity";

@EntityRepository(productsEntity)
export class productsRepository extends Repository<productsEntity> {
    private logger = new Logger();

    async addProduct(productDetails, username){
        const {title, description, belongsTo, price, units}  = productDetails;
        try{
            let newProduct = new productsEntity();
            newProduct.title = title;
            newProduct.description = description;
            newProduct.price = price;
            newProduct.units = units;
            newProduct.seller = username;
            newProduct.categories = [belongsTo];
            await this.manager.save( newProduct ); 
        }
        catch(err){
            this.logger.error(err.message);
            throw new InternalServerErrorException('Failed adding Product.')
        }
    }
}