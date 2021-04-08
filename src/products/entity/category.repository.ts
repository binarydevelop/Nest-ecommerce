import { HttpException, HttpStatus, Logger, Res } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { categoryEntity } from "./category.entity"

@EntityRepository(categoryEntity)
export class categoryRepository extends Repository<categoryEntity> {
    private logger = new Logger();

    async addCategory(categoryDetails): Promise<categoryEntity> {
        const { title } = categoryDetails;
        try{
            const existCategory = await categoryEntity.findOne({title});
            if(!existCategory){
                let newCategory = new categoryEntity();
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