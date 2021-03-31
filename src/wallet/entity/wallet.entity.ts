import { userEntity } from "src/users/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('wallet')
export class wallet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    balance: number;

    @OneToOne(()=> userEntity)
    user: userEntity

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