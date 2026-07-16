import { Router } from 'express';
import { Team } from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ message: 'Teams endpoint ready', teams });
});

router.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

export default router;
