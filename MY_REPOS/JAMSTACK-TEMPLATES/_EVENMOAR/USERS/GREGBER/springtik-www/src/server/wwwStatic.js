import express from 'express';
import path from 'path';

const router = express.Router();
const publicPath = path.join(__dirname, '../../public');

router.use(express.static(path.join(publicPath, 'www-public-static')));

export default router;
