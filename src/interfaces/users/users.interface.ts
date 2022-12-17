import { Document } from 'mongoose';

export interface Users extends Document {
  _id: string;
  email: string;
  name: string;
  isAdmin: Boolean
  password : string;
  profileImageUrl:string
}
