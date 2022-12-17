import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    _id: { type: String},
    email :  {type : String},
    name: {type : String},
    isAdmin:{type: Boolean},
    password:{type:String},
    profileImageUrl:{type:String},
    deletedCheck : {type: Boolean , default : false}
  },
  {
    collection: 'users',
  },
);

mongoose.model('users', UsersSchema);

UsersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});
