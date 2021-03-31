import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { UserRepository } from './entity/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ 
             TypeOrmModule.forFeature([UserRepository]),
             AuthModule,
             WalletModule, 
            ],
  controllers: [ UsersController ],
  providers: [ UsersService]
})
export class UsersModule {}
