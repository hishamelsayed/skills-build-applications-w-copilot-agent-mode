import { Router } from 'express';
import { Activity } from '../models/activity.js';
import { getApiBaseUrl } from '../config/api.js';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({
    message: 'Activities endpoint ready',
    activities,
    apiBaseUrl: getApiBaseUrl(),
  });
});

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

export default router;
