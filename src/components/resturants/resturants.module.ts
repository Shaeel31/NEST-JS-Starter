import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResturantSchema } from 'src/schemas/resturant/resturant.schema';
import { ResturantsController } from '../resturants/resturants.controller';
import { ResturantsService } from '../resturants/resturants.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'resturant', schema: ResturantSchema }]),
  ],
  controllers: [ResturantsController],
  providers: [ResturantsService]
})
export class ResturantsModule {}
