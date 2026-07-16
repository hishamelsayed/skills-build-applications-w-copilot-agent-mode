import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({ message: 'Activities endpoint ready', activities: [] });
});
export default router;
