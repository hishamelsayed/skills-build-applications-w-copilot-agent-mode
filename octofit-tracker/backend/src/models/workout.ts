import { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  suggestedFor: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
