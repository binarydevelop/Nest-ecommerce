import { Controller, Delete, Get, Logger, Param, Post, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Email, Id, User, UserRole } from 'src/common/decorators/user.decorator';
import { UserType } from 'src/common/enums/userType.enum';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { userEntity } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
@UseFilters(HttpExceptionFilter)
export class UsersController {
    constructor( private userService: UsersService ){}
    private logger = new Logger('Users Controller');

    @Get('me')
    @Roles(UserType.BUYER, UserType.SELLER)
    async getInfo(@User() user): Promise<userEntity>{
      this.logger.verbose(`Getting Information about ${user.username}`)
      return await this.userService.getInfo(user);
   }

   @Delete('me/delete')
   @Roles(UserType.BUYER, UserType.SELLER)
   async deleteAccount(@Id() id: number){
    this.logger.verbose(`Deleting user with id: ${id}`)
     this.userService.deleteAccount(id);
     return `Deleted ${id} Successfully`
   }

    @Get()
    @Roles(UserType.ADMIN)
    async findAll(){
      this.logger.verbose(`Getting Information about All Users.`)
      return this.userService.findAll();
    }

    @Get('find/:email')
    @Roles(UserType.ADMIN)
    async findByEmail(@Param('email') email){
      this.logger.verbose(`Finding ${email}`)
      return await this.userService.findByEmail(email);
    }
}








 /* ----------------------------------Need Information on Logging out. ------------------------ 
   @Get('me/logout')
   @Roles('SELLER', 'BUYER', 'ADMIN')
   async logout(){
     this.userService.logmeout();
   } */


 /* 
 --------------------------------------------------> Test <------------------------------------------------
    @Get()
    async test(){
      console.log('runs');
    } 
*/
/*  @Get()
    @UseGuards(AuthGuard(),   )
    async getInfo(@User() user){
      this.userService
  } */

