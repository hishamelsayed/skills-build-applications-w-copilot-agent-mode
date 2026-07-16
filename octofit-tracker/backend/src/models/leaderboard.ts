import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 1 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
