import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { addCategoryDto } from 'src/products/dto/addCategory.dto';
import { addProductDto } from './dto/addProduct.dto';
import { CategoryService } from './category.service';
import { ProductsService } from './products.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from 'src/common/enums/userType.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';


@Controller('products')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard(), RolesGuard)
export class ProductsController {
    constructor(private productService: ProductsService,
                private categoryService: CategoryService){}

    @Roles(UserType.ADMIN)
    @Post('category/add')
    async addCategory(@Body() categoryDetails: addCategoryDto){
        return this.categoryService.addCategory(categoryDetails);
    }

    @Roles(UserType.ADMIN)
    @Delete('category/:title/delete')
    async deleteCategory(@Param() title){
        this.categoryService.deleteCategory(title);
    }

    @Roles(UserType.ADMIN, UserType.SELLER)
    @Get('find/:category')
    async findCategory(@Param('category') category){
        return await this.categoryService.findCategory(category)
    }

    @Roles(UserType.ADMIN, UserType.SELLER)
    @Get('category/all')
    async getAllCategory(){
        return await this.categoryService.getAllCategories();
    }

    @Roles(UserType.SELLER, UserType.ADMIN)
    @Post('add')
    async addProduct(@Body() productDetails: addProductDto,
                     @Body('belongsTo') title) {
        const categoryExist = await this.categoryService.findCategory(title);
        if(categoryExist) {
            return this.productService.addProduct(productDetails)
        }else{
            throw new BadRequestException('Category Does Not Exist.');
        }
    }
}
