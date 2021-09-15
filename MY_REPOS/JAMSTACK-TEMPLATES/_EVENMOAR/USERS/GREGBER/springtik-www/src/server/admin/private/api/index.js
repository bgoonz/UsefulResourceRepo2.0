import express from 'express';
import api from '~/server/api/admin';
import createRouterFromApi from '~/server/utils/createRouterFromApi';
import errCheck from '~/server/utils/expressErrorChecking';

const router = express.Router();

router.get('/me', errCheck(async function (req, res) {
  const me = await api.me({req});
  res.send(me);
}));

router.use('/activities', createRouterFromApi('activities', {api}));
router.use('/categories', createRouterFromApi('categories', {api}));
router.use('/pictures', createRouterFromApi('pictures', {api}));

export default router;
