import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (user && user.userType === 'ADMIN' ){
        return true;
      }
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
  