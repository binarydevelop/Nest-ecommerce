import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { userEntity } from "../../users/entity/user.entity";

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    }
);

export const Email = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.email;
})

export const UserRole = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.userType;
})

export const Id = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.id;
})

export const Username = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.username;
})
