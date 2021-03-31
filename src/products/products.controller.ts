import { Body, Controller, Delete, Param, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { addCategoryDto } from 'src/products/dto/addCategory.dto';
import { addProductDto } from './dto/addProduct.dto';
import { CategoryService } from './category.service';
import { ProductsService } from './products.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from 'src/common/enums/userType.enum';


@Controller('products')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class ProductsController {
    constructor(private productService: ProductsService,
                private categoryService: CategoryService){}

    @Roles(UserType.SELLER, UserType.ADMIN)
    @Post('add')
    async addProduct(@Body() productDetails: addProductDto){
        this.productService.addProduct(productDetails)
    }

   // @Roles(userType.ADMIN)
    @Post('category/add')
    async addCategory(@Body() categoryDetails: addCategoryDto){
        this.categoryService.addCategory(categoryDetails);
    }

    @Roles(UserType.ADMIN)
    @Delete('category/:title/delete')
    async deleteCategory(@Param() title){
        this.categoryService.deleteCategory(title);
    }
}
