import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { categoryRepository } from './entity/category.repository';
import { productsRepository } from './entity/products.repository';

@Injectable()
export class ProductsService {
    constructor(
         @InjectRepository(productsRepository)
         private productRepository: productsRepository,
         ) {}

    async addProduct(productDetails){
        this.productRepository.addProduct(productDetails)
    }

}
