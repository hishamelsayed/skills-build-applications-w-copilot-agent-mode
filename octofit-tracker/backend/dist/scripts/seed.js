import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await LeaderboardEntry.deleteMany({});
        await Workout.deleteMany({});
        const users = await User.insertMany([
            { name: 'Avery', email: 'avery@example.com', fitnessLevel: 'advanced', team: 'Power Squad' },
            { name: 'Jordan', email: 'jordan@example.com', fitnessLevel: 'intermediate', team: 'Power Squad' },
            { name: 'Taylor', email: 'taylor@example.com', fitnessLevel: 'beginner', team: 'Velocity' },
        ]);
        await Team.insertMany([
            { name: 'Power Squad', description: 'High-energy weekly challenges', members: users.map((user) => user._id.toString()) },
            { name: 'Velocity', description: 'Fast-paced training group', members: [] },
        ]);
        await Activity.insertMany([
            { type: 'Run', durationMinutes: 35, caloriesBurned: 280, userId: users[0]._id.toString() },
            { type: 'Strength', durationMinutes: 45, caloriesBurned: 320, userId: users[1]._id.toString() },
        ]);
        await LeaderboardEntry.insertMany([
            { userId: users[0]._id.toString(), score: 90, rank: 1 },
            { userId: users[1]._id.toString(), score: 78, rank: 2 },
        ]);
        await Workout.insertMany([
            { title: 'HIIT Blast', difficulty: 'advanced', durationMinutes: 20, suggestedFor: 'Avery' },
            { title: 'Core Flow', difficulty: 'beginner', durationMinutes: 15, suggestedFor: 'Taylor' },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
