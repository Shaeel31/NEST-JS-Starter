import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users } from 'src/interfaces/users/users.interface';

@Injectable()
export class UsersService {
  constructor() { }

  @InjectModel('users') private _usersModel: Model<Users>


  async getAllUsers(limit, offset) {

    limit = parseInt(limit) < 1 ? 10 : limit;
    offset = parseInt(offset) < 0 ? 0 : offset;

    return this._usersModel
      .find()
      .skip(parseInt(offset))
      .limit(parseInt(limit));

  }

  async getUserById(id) {
    debugger
    if (!id) {
      throw new Error('Please provide userId')
    } 
    const user = await this._usersModel.findById({ _id: id });
    if (!user) {
      throw new NotFoundException({ status: 404, message: 'No record Found' })
    }
    return user;
  }

  async addUser(userDto) {
    debugger
    if (!userDto.id) {
      userDto._id = new Types.ObjectId().toString();
    }
    const user = await new this._usersModel(userDto).save();
    return user
  }

  async deleteUserById(id) {
    if (!id) {
      throw new Error('Please provide userId')
    }
    const updateUser = await this._usersModel.updateOne(
      { _id: id },
      {
        $set: { deletedCheck: true },
      })
  }

  loginByEmail(loginDto){
    if(!(loginDto.email&&loginDto.password)){
      throw new HttpException('Forbidden' , HttpStatus.BAD_REQUEST)
    }   
  }

}
