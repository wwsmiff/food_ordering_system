import {Document, model, models, Schema} from 'mongoose';

interface IAudit extends Document {
  entityType: string;
  entityId: Schema.Types.ObjectId;
  userId: string;
  field: string;
  oldValue: any;
  newValue: any;
  timestamp: Date;
}

const AuditSchema = new Schema<IAudit>({
  entityType : String,
  entityId : Schema.Types.ObjectId,
  userId : String,
  field : String,
  oldValue : Schema.Types.Mixed,
  newValue : Schema.Types.Mixed,
  timestamp : {type : Date, default : Date.now}
});

export const Audit = model('Audit', AuditSchema);
