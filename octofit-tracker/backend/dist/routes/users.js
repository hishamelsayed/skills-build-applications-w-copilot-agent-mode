import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
const router = Router();
router.get('/', (_req, res) => {
    res.json({
        message: 'Users endpoint ready',
        users: [],
        apiBaseUrl: getApiBaseUrl(),
    });
});
export default router;
