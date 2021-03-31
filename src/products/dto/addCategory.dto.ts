import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class addCategoryDto{
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(128)
    title: string;
}