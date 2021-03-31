import { InjectRepository } from "@nestjs/typeorm";
import { categoryRepository } from "./entity/category.repository";

export class CategoryService{
    constructor(@InjectRepository(categoryRepository)
    private categoryRepository:categoryRepository){}

    async addCategory(categoryDetails){
        this.categoryRepository.addCategory(categoryDetails);
    }

    async deleteCategory(title){
        this.categoryRepository.deleteCategory(title);
    }
}