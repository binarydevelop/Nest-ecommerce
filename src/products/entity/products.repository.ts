import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CategoryService } from "../category.service";
import { category } from "./category.entity";
import { categoryRepository } from "./category.repository";
import { productsEntity } from "./products.entity";

@EntityRepository(productsEntity)
export class productsRepository extends Repository<productsEntity> {
    async addProduct(productDetails){
        const {title, description, belongsTo, price, units}  = productDetails;
        let newProduct = new productsEntity();
        newProduct.title = title;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.units = units;
        newProduct.categories = [belongsTo];
        newProduct.save();
    }
}