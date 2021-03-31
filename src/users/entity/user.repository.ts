import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { signinDto } from "src/auth/dto/signIn.dto";
import { signUpDto } from "src/auth/dto/signUp.dto";
import { EntityRepository, Repository } from "typeorm";
import { userEntity } from "./user.entity";
import { helperFunctions } from '../../common/utils/helperFunction.utils'
import * as bcrypt from 'bcrypt'
import { wallet } from "src/wallet/entity/wallet.entity";

@EntityRepository(userEntity)
export class UserRepository extends Repository<userEntity>{      
    async signUp(signUpCredentials: signUpDto): Promise<userEntity> {
        const { username, email, password, power} = signUpCredentials;
        const found = await this.find({email});
        if(found.length> 0){
            throw new BadRequestException('Email Already Exists.')
        }
            const salt = await bcrypt.genSalt()
            const hashedPassword = await helperFunctions.hashPassword(password, salt);
            let newUser =  new userEntity();
            newUser.email = email;
            newUser.username = username;
            newUser.password =  hashedPassword;
            newUser.userType = power;
            newUser.salt = salt;
            await newUser.save();
            return newUser;
    }

    async validateUserPassword(signInCredentials: signinDto) {
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
        }else{
            throw new UnauthorizedException('Invalid Credentials.')
        }
    }
    async findAll(){
        return await this.find();
    }

    async findByMail(email){
         await this.findOne(email)
    }
}