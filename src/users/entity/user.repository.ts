import { BadRequestException, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { signinDto } from "src/auth/dto/signIn.dto";
import { signUpDto } from "src/auth/dto/signUp.dto";
import { EntityRepository, Repository } from "typeorm";
import { userEntity } from "./user.entity";
import { helperFunctions } from '../../common/utils/helperFunction.utils'
import * as bcrypt from 'bcrypt'
import { wallet } from "src/wallet/entity/wallet.entity";

@EntityRepository(userEntity)
export class UserRepository extends Repository<userEntity>{      
    private logger = new Logger();

    async signUp(signUpCredentials: signUpDto): Promise<userEntity> {
        try{
            const { username, email, password, power} = signUpCredentials;
            const found = await this.find({email});
            if(found.length> 0){
                throw new BadRequestException('Email Already Exists.')
            }
            let newUser =  new userEntity();
            let newWallet = new wallet();
            if(power === 'BUYER' || power === 'ADMIN'){
                newWallet.balance = 10000;
            }else{
                newWallet.balance = 0 ;
            }
                await newWallet.save();
                const salt = await bcrypt.genSalt()
                const hashedPassword = await helperFunctions.hashPassword(password, salt);
                newUser.email = email;
                newUser.username = username;
                newUser.password =  hashedPassword;
                newUser.userType = power;
                newUser.salt = salt;
                newUser.walletId = newWallet.id;
               // newUser.wallet = newWallet;
                await newUser.save();
                return newUser;
        }
        catch(err){
            this.logger.error({message: err.message})
            throw new InternalServerErrorException('Failed Signing Up.');
        }
    }

    async validateUserPassword(signInCredentials: signinDto) {
        try{
            const { email, password } = signInCredentials;
            const user = await this.findOne({email});
                if(user){
                    const hashedPassword = await helperFunctions.hashPassword(password, user.salt);
                    if (hashedPassword === user.password){
                        let obj= {
                            email: user.email,
                            power: user.userType
                        }
                        return (obj);
                    }
            } else {
                throw new UnauthorizedException('Invalid Credentials.')
            }
        }
        catch(err){
            this.logger.error({message: err.message})
            throw new InternalServerErrorException('Failed Signing In.');
        }

    }
    async findAll(): Promise<userEntity[]> {
       try{
        return await this.find();
       }
       catch(err){
        this.logger.error({message: err.message})
        throw new InternalServerErrorException('Failed Getting all Entittes.');
       }
    }

    async findByEmail(email){
        try{
            return await this.findOne({email});
        }
        catch(err){
            this.logger.error({message: err.message})
            throw new InternalServerErrorException('Failed finding Email.');
        }
    }
}