import { productsEntity } from "src/products/entity/products.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class categoryEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: 'all', unique: true})
    title: string;
    
    @OneToMany(()=> productsEntity, product => product.categories)
    products: productsEntity[];

}

