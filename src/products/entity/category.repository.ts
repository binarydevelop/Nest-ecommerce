import { HttpException, HttpStatus, Logger, Res } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { category } from "./category.entity"

@EntityRepository(category)
export class categoryRepository extends Repository<category> {
    private logger = new Logger();

    async addCategory(categoryDetails): Promise<category> {
        const { title } = categoryDetails;
        try{
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
        catch(err){
            this.logger.error(err);
            throw new HttpException('Failed adding category', HttpStatus.UNPROCESSABLE_ENTITY)
        }
       
    }

    async deleteCategory(title){
        await this.delete(title);   
    }
}