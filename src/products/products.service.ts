import { HttpException, HttpStatus, Injectable, Logger, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyObject } from 'node:crypto';
import { userEntity } from 'src/users/entity/user.entity';
import { UserRepository } from 'src/users/entity/user.repository';
import { UsersService } from 'src/users/users.service';
import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { categoryEntity } from './entity/category.entity';
import { categoryRepository } from './entity/category.repository';
import { productsEntity } from './entity/products.entity';
import { productsRepository } from './entity/products.repository';

@Injectable()
export class ProductsService {
    constructor(
         @InjectRepository(productsRepository)
         private productRepository: productsRepository,
         ) {}

         logger = new Logger();

    async addProduct(productDetails, username, categor){ 
       return await this.productRepository.addProduct(productDetails, username, categor)
    }

    async findAllProducts(){
        return this.productRepository.findAllProducts();
    }

    async findProductsBySeller(seller){
       const sellerExist = await userEntity.findOne({username: seller});
       if(sellerExist){
           return await this.productRepository.findProductsBySeller(seller)
       }else{
           return new HttpException('Seller does not exist', HttpStatus.NOT_FOUND)
       }
    }

    async findProductById(id){
        try{
            const result = await this.productRepository.findOne(id);
            if(result){
                return result;
            }else {
                return ({message: 'No product Found.', status: 'Completed'})
            }  
        }
        catch(err){
            this.logger.error(err.message)
            throw new HttpException('Failed Getting Product.', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findProductsByCategory(category){
       return await this.productRepository.findProductsByCategory(category);
    }

    async findProductByTitle(title){
        return await this.productRepository.findOne({title: title})
    }
}
