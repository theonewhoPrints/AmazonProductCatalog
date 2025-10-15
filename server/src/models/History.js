import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    action: { type: String, enum: ['create', 'update', 'delete', 'add_field'], required: true },
    uniqId: { type: String },
    filter: { type: mongoose.Schema.Types.Mixed },
    changes: { type: mongoose.Schema.Types.Mixed },
    snapshot: { type: mongoose.Schema.Types.Mixed },
    message: { type: String }
  },
  { timestamps: true }
);

export const History = mongoose.model('History', historySchema, 'productcatalog_history');


