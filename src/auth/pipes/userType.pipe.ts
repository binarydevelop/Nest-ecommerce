import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { UserType } from "../../common/enums/userType.enum";

@Injectable()
export class userTypevalidation implements PipeTransform{
    readonly allowedTypes = [
            UserType.BUYER,
            UserType.SELLER
    ]

    transform(type: any){
        if(!this.isValidType(type)){
            throw new BadRequestException(`${type} is not valid.`)
        }
    }

    private isValidType(userType: any){
        let index = this.allowedTypes.indexOf(userType);
        return index !== -1;
    }
}