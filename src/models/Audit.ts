import {Document, model, models, Schema} from 'mongoose';

export interface IAudit extends Document {
  entityType: string;
  entityId: string;
  field: string;
  oldValue: any;
  newValue: any;
  timestamp: Date;
}

const AuditSchema = new Schema<IAudit>({
  entityType : {type : String, required : true},
  entityId : {type : String, required : true},
  field : {type : String, required : true},
  oldValue : Schema.Types.Mixed,
  newValue : Schema.Types.Mixed,
  timestamp : {type : Date, default : Date.now}
});

const Audit = models.Audit || model<IAudit>('Audit', AuditSchema);
export default Audit;
