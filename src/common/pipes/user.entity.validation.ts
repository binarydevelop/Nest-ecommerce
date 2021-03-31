import { ArgumentMetadata, ArgumentsHost, BadRequestException, PipeTransform } from "@nestjs/common";
import { UserType } from "../enums/userType.enum";

export class userEntityValidationPipe implements PipeTransform{
    readonly allowedTypes= [
        UserType.BUYER,
        UserType.SELLER
    ]
    transform(value: any, metadata: ArgumentMetadata){
        value = value.toUpperCase();

        if(!this.isValidType(value)){
            throw new BadRequestException(`${value} is not valid.`)
        }
    }

    private isValidType(value: any){
        let index = this.allowedTypes.indexOf(value);
        return index !== -1;
    }
}