import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { ResturantDto } from 'src/dto/resturant/resturant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResturantsService } from './resturants.service';

@Controller('resturants')
@ApiUseTags('Resturant')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResturantsController {


    constructor(private _resturantService : ResturantsService){}

    @Get('getAllResturants')
  getAllResturants(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this._resturantService.getAllResturants(limit, offset);
  }

  @Get('getResturantById/:id')
  getResturantById(@Param('id') id: string) {
    return this._resturantService.getResturantById(id);
  }

  @Post('addResturant')
  addResturant(@Body() resturantDto: ResturantDto) {
    return this._resturantService.addResturant(resturantDto);
  }

  @Post('updateResturant')
  updateResturant(@Body() resturantDto: ResturantDto) {
    return this._resturantService.updateResturant(resturantDto);
  }

  @Get('deleteResturantById/:id')
  deleteResturantById(@Param('id') id: string) {
    return this._resturantService.deleteResturantById(id);
  }

}
