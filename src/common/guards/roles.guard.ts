import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}

  canActivate(context: ExecutionContext) {
    const {user} = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string>('userType', context.getHandler());
    if(!roles.includes(user.userType)){
      return false;
    }
    return true;
  }
}

