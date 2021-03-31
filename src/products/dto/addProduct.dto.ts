import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { category } from "../entity/category.entity";


export class addProductDto{
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(256)
    title: string;

    @IsNotEmpty({message: "Description cannot be empty."})
    description: string;

    @IsNotEmpty({ message: "category needs to be set."})
    belongsTo: string;

    @IsNotEmpty({message: "Price cannot be Empty."})
    price: string;

    @IsNotEmpty({message: "Units cannot be Empty."})
    units: number
}