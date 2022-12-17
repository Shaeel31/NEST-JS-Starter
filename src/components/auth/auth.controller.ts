import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Get('getLoginToken/:email/:password')
  loginToken(
    @Param('email') email: string,
    @Param('password') password: string,
  ) {
    if (email == 'tt@gmail.com' && password == 'tt@123') {
      return this._authService.loginToken();
    } else {
      return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  // @Get('isUsernameAvailable/:username')
  // isUsernameAvailable(@Param('username') username: string) {
  //   return this._authService.isUsernameAvailable(username); 
  // }

  // @Post('loginByEmail')
  // loginByEmail(@Body() loginDto: LoginUserDto) {
  //   return this._authService.loginByEmail(loginDto);
  // }
}
