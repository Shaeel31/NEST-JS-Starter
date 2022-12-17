import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resturant } from 'src/interfaces/resturant/resturant.interface';

@Injectable()
export class ResturantsService {
    constructor(){}

    @InjectModel('resturant') private _resturantModel: Model<Resturant>


    async getAllResturants(limit , offset){

        limit = parseInt(limit) < 1 ? 10 : limit;
        offset = parseInt(offset) < 0 ? 0 : offset;
    
        return await 
        this._resturantModel.find()
        .skip(offset)
        .limit(limit)

    }

    getResturantById(id){}

    updateResturant(resturantDto){}

    addResturant(resturantDto){}

    deleteResturantById(id){}

}
