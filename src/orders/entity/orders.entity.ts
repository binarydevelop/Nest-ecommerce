import { userEntity } from "src/users/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders')
export class ordersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", nullable: false })
    product: string; // Array of Products 

    @Column({type:"integer", nullable:false})
    quantity: number;

    @Column({type:"integer", nullable:false})
    totalPrice: number;

    @ManyToOne(() => userEntity, (user : userEntity) => user.orders )
    user: userEntity;

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