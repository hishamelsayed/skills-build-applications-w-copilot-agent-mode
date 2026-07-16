import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    userId: { type: String, default: '' },
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);
