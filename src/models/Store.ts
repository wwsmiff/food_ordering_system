import {Document, model, Schema} from 'mongoose';

export interface IStore extends Document {
  name: string;
  branch_id: string;
  location: string;
  owner_id: string;
  status: 'active'|'inactive';
}

const StoreSchema = new Schema<IStore>({
  name : {type : String, required : true},
  branch_id : {type : String, required : true},
  location : {type : String, required : true},
  owner_id : {type : String, required : true},
  status : {type : String, enum : [ 'active', 'inactive' ], default : 'active'}
});

export default model<IStore>('Store', StoreSchema);
