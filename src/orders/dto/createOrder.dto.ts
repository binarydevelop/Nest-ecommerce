import { IsNotEmpty } from "class-validator"


export class createOrderDto{
     @IsNotEmpty()
     productName: string

     @IsNotEmpty()
     quantity: number

}