import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { addCategoryDto } from 'src/products/dto/addCategory.dto';
import { addProductDto } from './dto/addProduct.dto';
import { CategoryService } from './category.service';
import { ProductsService } from './products.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from 'src/common/enums/userType.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Username } from 'src/common/decorators/user.decorator';


@Controller('products')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard(), RolesGuard)
export class ProductsController {
    constructor(private productService: ProductsService,
                private categoryService: CategoryService){}

    logger = new Logger('Products Controller');

    @Roles(UserType.ADMIN)
    @Post('category/add')
    async addCategory(@Body() categoryDetails: addCategoryDto){
        this.logger.verbose(`Adding category ${categoryDetails}`)
        return this.categoryService.addCategory(categoryDetails);
    }

    @Roles(UserType.ADMIN)
    @Delete('category/:title/delete')
    async deleteCategory(@Param() title){
        this.logger.verbose(`Deleting category: ${title}`)
        this.categoryService.deleteCategory(title);
    }

    @Roles(UserType.ADMIN, UserType.SELLER)
    @Get('find/:category')
    async findCategory(@Param('category') category){
        this.logger.verbose(`Finding Information about ${category}`)
        return await this.categoryService.findCategory(category)
    }

    @Roles(UserType.ADMIN, UserType.SELLER)
    @Get('category/all')
    async getAllCategory(){
        this.logger.verbose(`Getting all Categories.`)
        return await this.categoryService.getAllCategories();
    }

    @Roles(UserType.SELLER)
    @Post('add')
    async addProduct(@Body() productDetails,
                     @Body('categories') title,
                     @Username() username ) {
        this.logger.verbose(`Adding Product to category ${title}.`)
        const categoryExist = await this.categoryService.findCategory(title);
        if(categoryExist) {
           const categor = categoryExist[0];
            return this.productService.addProduct(productDetails, username, categor)
        }else{
            throw new BadRequestException('Category Does Not Exist.');
        }
    } 
    
    @Roles(UserType.ADMIN, UserType.BUYER)
    @Get('all')
    async findAllProducts(){
        return await this.productService.findAllProducts();
    }

    @Roles(UserType.ADMIN, UserType.SELLER)
    @Get(':seller')
    async findProductsBySeller(@Param('seller') seller){
        return await this.productService.findProductsBySeller(seller)
    }
    
    @Roles(UserType.ADMIN, UserType.BUYER)
    @Get(':id')
    async findProductById(@Param('id') id: number){
        return await this.productService.findProductById(id);
    }

    @Roles(UserType.ADMIN, UserType.SELLER)
    @Get('category/:category') 
    async findProductsByCategory(@Param('category') category){
        const categoryExist = await this.categoryService.findCategory(category); //{ id: 1, title: 'TestProduct' }
        if(categoryExist){ 
            let {title} = categoryExist;
            return await this.productService.findProductsByCategory(title);
        } else {
            throw new BadRequestException('Not Found');
        }
    }



}
