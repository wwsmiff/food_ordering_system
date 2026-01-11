import {Document, model, models, Schema} from 'mongoose';

export interface IItem extends Document {
  name: string, brand: string, category: string, product_code: string,
      branch_id: string;
}

const itemSchema = new Schema<IItem>({
  name : {type : String, required : true},
  brand : {type : String, required : true},
  category : {type : String, required : true},
  product_code : {type : String, required : true},
  branch_id : {type : String, required : true},
},
                                     {timestamps : true});

const Item = model<IItem>('Item', itemSchema);
export default Item;
