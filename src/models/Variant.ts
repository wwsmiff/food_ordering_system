import {Document, model, models, Schema} from 'mongoose'

export interface IVariant extends Document {
  name: string, selling_price: number, cost_price: number, quantity: number,
      properties: Record<string, string>;
}

const variantSchema = new Schema<IVariant>({
  name : {type : String, required : true},
  selling_price : {type : Number, required : true},
  cost_price : {type : Number, required : true},
  quantity : {type : Number, required : true},
  properties : {type : Map, of : String}
})

const Variant = model<IVariant>('Variant', variantSchema);

export default Variant;
