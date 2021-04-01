import { category } from "src/products/entity/category.entity";
import { userEntity } from "src/users/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class productsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    title: string;

    @Column({type: "text", nullable: false})
    description: string;

    @Column({type:"integer", nullable: false})
    price: number;

    @Column({type:"integer", nullable: false})
    units: number;

    @ManyToMany(() => category, categories => categories.products, {cascade: true})
    @JoinTable({name: 'product_category'})
    categories: category[];

    @Column({type:"text", nullable: false})
    seller: userEntity;
    
    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'timestamp',
        name: 'created_at',
      })
      createdAt: Date;
      @UpdateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'timestamp',
        name: 'updated_at',
      })
      updatedAt: Date;
}