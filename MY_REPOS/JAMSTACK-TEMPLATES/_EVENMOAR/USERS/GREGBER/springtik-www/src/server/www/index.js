import express from 'express';
import wwwPublic from './public';

const router = express.Router();

router.use(wwwPublic);

export default router;
