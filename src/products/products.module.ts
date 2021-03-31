import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from 'src/products/entity/category.entity';
import { categoryRepository } from './entity/category.repository';
import { CategoryService } from './category.service';
import { productsRepository } from './entity/products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [  productsRepository,
         categoryRepository
      ]
      )],
  controllers: [ProductsController],
  providers: [
              ProductsService,
              CategoryService
            ]
})
export class ProductsModule {}
