import { ordersEntity } from "src/orders/entity/orders.entity";
import { wallet } from "src/wallet/entity/wallet.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "../../common/enums/userType.enum";

@Entity('userentity')
export class userEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", nullable: false})
    username: string;

    @Column({type:"text", nullable: false})
    email: string;

    @Column({type:"text", nullable:false})
    password: string;

    @Column({default: 'BUYER', nullable: false})
    userType: UserType;

    @Column({nullable:false})
    salt: string;

    @OneToMany(() => ordersEntity, orders => orders.user, {eager: true, cascade: true})
    orders: ordersEntity[];

    @Column({nullable: true})
    walletId: number
    @OneToOne(()=> wallet, {cascade:true, eager: true})
    @JoinColumn( {name: 'walletId' } )
    wallet: wallet  

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
