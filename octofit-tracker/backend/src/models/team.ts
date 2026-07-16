import { Schema, model, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    members: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Team = model<ITeam>('Team', teamSchema);
