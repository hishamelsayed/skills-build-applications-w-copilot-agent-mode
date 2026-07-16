import { Schema, model, type Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  userId?: string;
}

const activitySchema = new Schema<IActivity>(
  {
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    userId: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Activity = model<IActivity>('Activity', activitySchema);
