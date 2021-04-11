import { HttpException, HttpStatus, Injectable, Logger, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { getConnection, getRepository, Repository } from 'typeorm';
import { categoryEntity } from './entity/category.entity';
import { categoryRepository } from './entity/category.repository';
import { productsEntity } from './entity/products.entity';
import { productsRepository } from './entity/products.repository';

@Injectable()
export class ProductsService {
    constructor(
         @InjectRepository(productsRepository)
         private productRepository: productsRepository,
         @InjectRepository(categoryRepository)
         private categoryRepository:Repository<categoryEntity>
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

    
}
