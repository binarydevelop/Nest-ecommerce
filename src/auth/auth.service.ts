import { Inject, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userEntity } from '../users/entity/user.entity';
import { UserRepository } from '../users/entity/user.repository';
import { signinDto } from './dto/signIn.dto';
import { signUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {

    constructor( @InjectRepository(UserRepository)
                private readonly UserRepository: UserRepository,
                private jwtService: JwtService){}
    
    async signup(signUpCredentials: signUpDto): Promise<userEntity>{ 
        return this.UserRepository.signUp(signUpCredentials);
    }

    async signIn(signInCredentials: signinDto){
        const matched = await this.UserRepository.validateUserPassword(signInCredentials);
        if(!matched){
            throw new UnauthorizedException('Invalid Credentials.')
        }
        const payload = matched;
        const accessToken = this.jwtService.sign(payload);
        return {accessToken};
     }   
}
