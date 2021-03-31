import { HttpStatus, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction } from "express";
import { userEntity } from "src/users/entity/user.entity";

export class isAdmin implements NestMiddleware{
    async use(req: Request, res: Response, next: NextFunction) {
        const email =  req.body['email'];
        const user = await userEntity.findOne({email});
        if(user.userType === 'ADMIN'){
          next();
        }
        else{
          throw new UnauthorizedException(HttpStatus.NON_AUTHORITATIVE_INFORMATION, 'Admins Only Route')
        }
      }
}