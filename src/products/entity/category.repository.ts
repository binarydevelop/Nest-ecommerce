import { HttpException, HttpStatus, Res } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { category } from "./category.entity"

@EntityRepository(category)
export class categoryRepository extends Repository<category> {
    async addCategory(categoryDetails): Promise<category> {
        const { title } = categoryDetails;
        const existCategory = await category.findOne({title});
        if(!existCategory){
            let newCategory = new category();
            newCategory.title = title;
            newCategory.save();
            return newCategory;
        }
        else {
            throw new HttpException('Category Exists.', HttpStatus.NOT_ACCEPTABLE)
        }
    }

    async deleteCategory(title){
        await this.delete(title);   
    }
}