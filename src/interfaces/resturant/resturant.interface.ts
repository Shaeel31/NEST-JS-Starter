import { Document } from 'mongoose';

export interface Resturant extends Document {
  _id: string;
  name: string;
  location: string  
  displayImageUrl : string
  perNightCharges : string
}
