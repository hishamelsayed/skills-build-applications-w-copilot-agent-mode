import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({ message: 'Users endpoint ready', users: [] });
});
export default router;
