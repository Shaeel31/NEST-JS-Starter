import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/schemas/users/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { ProfileSchema } from '../../schemas/profile/profile.schema';
// import { ProfileController } from './users.controller';
// import { ProfileService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
