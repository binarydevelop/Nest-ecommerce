import { BadRequestException, HttpException, HttpStatus, InternalServerErrorException, Logger } from "@nestjs/common";
import { Connection, EntityRepository, getRepository, Repository } from "typeorm";
import { CategoryService } from "../category.service";
import { categoryEntity } from "./category.entity";
import { categoryRepository } from "./category.repository";
import { productsEntity } from "./products.entity";

@EntityRepository(productsEntity)
export class productsRepository extends Repository<productsEntity> {
    private logger = new Logger();

    async addProduct(productDetails: productsEntity, username, categor: categoryEntity){
        const {title, description, price, units}  = productDetails;
        try{ 
            let newProduct = new productsEntity();
            newProduct.title = title;
            newProduct.description = description;
            newProduct.price = price;
            newProduct.units = units;
            newProduct.soldBy = username;
           
            newProduct.categories = newProduct?.categories ?? [];
            newProduct.categories.push(categor);
            categor.products= categor?.products?? [];
            categor.products.push(newProduct);
            await newProduct.save();
            await categor.save();
            
        }
        catch(err){
            this.logger.error(err.message);
            throw new HttpException('Failed adding Product.', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findProduct(productName){
        try{
            return await this.findOne({title: productName})
        }
        catch(err){
            this.logger.error(err.message);
            return new HttpException('Product Not Found', HttpStatus.NOT_FOUND)
        }
    }

    async findAllProducts(){
        try{
            return await this.find();
        }
        catch(err){
            this.logger.error(err.message);
            return new HttpException('Failed finding Products', HttpStatus.NOT_FOUND)
        } 
    }

    async findProductsBySeller(seller: string){
        try{
            return await this.find({where: {soldBy: seller}})
        }
        catch(err){
            return new HttpException(`Problem fetching products of ${seller}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}