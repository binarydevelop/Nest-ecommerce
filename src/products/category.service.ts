import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { categoryRepository } from "./entity/category.repository";

export class CategoryService{
    constructor(
        @InjectRepository(categoryRepository)
        private categoryRepository:categoryRepository) {}

    async addCategory(categoryDetails){
       return this.categoryRepository.addCategory(categoryDetails);
    }

    async deleteCategory(title){
        this.categoryRepository.deleteCategory(title);
    }

    async getAllCategories(){
        return await this.categoryRepository.find();
    }

    async findCategory(title){
        const found =  await this.categoryRepository.find({where: {title : title}});
        if(found){
            return found;
        } else {
            throw new BadRequestException('Not Found');
        }
    }
}