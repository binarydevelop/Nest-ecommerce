import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categoryEntity} from 'src/products/entity/category.entity';
import { categoryRepository } from './entity/category.repository';
import { CategoryService } from './category.service';
import { productsRepository } from './entity/products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [  productsRepository,
         categoryRepository
      ]),
         AuthModule],
  controllers: [ProductsController],
  providers: [
              ProductsService,
              CategoryService,
            ]
})
export class ProductsModule {}
