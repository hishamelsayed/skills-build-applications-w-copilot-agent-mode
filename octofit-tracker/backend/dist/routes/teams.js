import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({ message: 'Teams endpoint ready', teams: [] });
});
export default router;
