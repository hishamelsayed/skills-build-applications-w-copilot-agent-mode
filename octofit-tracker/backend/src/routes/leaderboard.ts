import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Leaderboard endpoint ready', leaderboard: [] });
});

export default router;
