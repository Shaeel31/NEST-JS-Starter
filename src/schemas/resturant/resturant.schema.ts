import * as mongoose from 'mongoose';

export const ResturantSchema = new mongoose.Schema(
  {
    _id: { type: String},
    name : {type : String},
    location : {type : String},
    perNightCharges : {type : Number},
    displayImageUrl : {type: String},
    projectId : {type : String}
  },
  {
    collection: 'resturants',
  },  
);

mongoose.model('resturants', ResturantSchema);

ResturantSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});
