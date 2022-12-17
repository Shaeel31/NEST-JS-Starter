import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { Profile } from './../../interfaces/profile/profile.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { LoginUserDto } from '../../dto/profile/login.dto';
// import { Club } from '../../interfaces/club/club.interface';
// import { PickerClubInterface } from '../../interfaces/pickerClub/pickerClubs.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // @InjectModel('Profile') private readonly _usersModel: Model<Profile>,
    // @InjectModel('Club') private _clubModel: Model<Club>,
    // @InjectModel('PickerClubs') private _pikcerClubModel: Model<PickerClubInterface>,

    private httpService: HttpService,
  ) {}

  async loginToken() {
    const userData = {
      id: '3u7GhLAKaRR2QkEGFH7WqHIE6lI2',
      email: 'shaeel@gmail.com',
      admin: true,
    };
    return this.generateToken(userData);
  }

  private generateToken(payload) {
    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

}
