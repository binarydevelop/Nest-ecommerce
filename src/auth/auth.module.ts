import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'
import { UserRepository } from '../users/entity/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from '../common/strategy/jwt.strategy';
dotenv.config();

@Module({
  imports: [ PassportModule.register( {defaultStrategy : 'jwt'} ),
            TypeOrmModule.forFeature([UserRepository]),
            JwtModule.register( { secret: process.env.SECRET_KEY, signOptions: { expiresIn: 3600 } } ) 
          ],
  controllers: [ AuthController ],
  providers:   [ AuthService,
                JwtStrategy    ],
  exports:     [ JwtStrategy,
                PassportModule ]
})
export class AuthModule {}
