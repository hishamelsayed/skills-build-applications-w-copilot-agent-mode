import { Router } from 'express';
import { LeaderboardEntry } from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ message: 'Leaderboard endpoint ready', leaderboard });
});

router.post('/', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

export default router;
