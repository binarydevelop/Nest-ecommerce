import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
export class helperFunctions {
    static async hashPassword(password:string, salt ) {
        try{
            const hashed=  await bcrypt.hash(password, salt);
            return hashed;
        }
        catch(err){
            console.log(err);
            return new InternalServerErrorException();
        }
    }
}