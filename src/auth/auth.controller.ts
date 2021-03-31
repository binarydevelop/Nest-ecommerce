import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { userEntity } from '../users/entity/user.entity';
import { AuthService } from './auth.service';
import { signinDto } from './dto/signIn.dto';
import { signUpDto } from './dto/signUp.dto';
import { userTypevalidation } from './pipes/userType.pipe';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    async signUp(@Body(ValidationPipe) signUpCredentials: signUpDto,
                @Body('power', userTypevalidation) power): Promise<userEntity> {
    return this.authService.signup(signUpCredentials);
    }

    @Post('signin')
    async signIn(@Body(ValidationPipe) signInCredentials: signinDto){
        return this.authService.signIn(signInCredentials);
    } 

/* ------------------------------------------> TEST ROUTE <---------------------------------------
  @UseGuards(AuthGuard(), BuyerGuard)
 @Get('test')
 test(@User() user){
    console.log(user)
}  */
}
