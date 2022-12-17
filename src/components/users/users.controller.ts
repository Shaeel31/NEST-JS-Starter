import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login/login.dto';
import { UsersDto } from 'src/dto/users/users.dto';
// import { EditProfileDto } from '../../dto/profile/edit-profile.dto';
// import { ProfileDto } from '../../dto/profile/profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
// import { ProfileService } from './profile.service';

@ApiUseTags('Users')
@Controller('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private _userService: UsersService) {}

  @Get('getAllUsers')
  getAllUsers(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this._userService.getAllUsers(limit, offset);
  }

  @Get('getUserById/:id')
  getUserById(@Param('id') id: string) {
    return this._userService.getUserById(id);
  }

  @Post('addUser')
  addUser(@Body() userDto: UsersDto) {
    return this._userService.addUser(userDto);
  }

//   @Post('updateUser')
//   updateUser(@Body() userDto: EditProfileDto) {
//     return this._userService.updateUser(userDto);
//   }

  @Get('deleteUserById/:id')
  deleteUserById(@Param('id') id: string) {
    return this._userService.deleteUserById(id);
  }

  @Post('loginByEmail/')
  loginByEmail( @Body() loginDto : LoginDto) {
    return this._userService.loginByEmail(loginDto);
  }


  
}
