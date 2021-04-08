import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { userEntity } from "src/users/entity/user.entity";
import { categoryEntity } from "../entity/category.entity";


export class addProductDto{
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(256)
    title: string;

    @IsNotEmpty({message: "Description cannot be empty."})
    description: string;

    @IsNotEmpty({ message: "category needs to be set."})
    categories: categoryEntity[];

    @IsNotEmpty({message: "Price cannot be Empty."})
    price: number;

    @IsNotEmpty({message: "Units cannot be Empty."})
    units: number;

    soldBy: userEntity;
}