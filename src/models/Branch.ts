import {Document, model, Schema} from 'mongoose';

export interface IBranch extends Document {
  name: string;
  store_id: string;
  location: string;
  manager_id: string;
}

const BranchSchema = new Schema<IBranch>({
  name : {type : String, required : true},
  store_id : {type : String, required : true},
  location : {type : String, required : true},
  manager_id : {type : String, required : true}
});

export default model<IBranch>('Branch', BranchSchema);
