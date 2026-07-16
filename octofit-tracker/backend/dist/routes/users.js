import { Router } from 'express';
import { User } from '../models/user.js';
import { getApiBaseUrl } from '../config/api.js';
const router = Router();
router.get('/', async (_req, res) => {
    const users = await User.find({}).lean();
    res.json({
        message: 'Users endpoint ready',
        users,
        apiBaseUrl: getApiBaseUrl(),
    });
});
router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});
export default router;
