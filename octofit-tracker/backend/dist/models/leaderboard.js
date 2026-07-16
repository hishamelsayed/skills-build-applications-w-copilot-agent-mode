import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 1 },
}, { timestamps: true });
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
