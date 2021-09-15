import express from 'express';
import errCheck from '~/server/utils/expressErrorChecking';

export default (name, {api}) => {
  const router = express.Router();

  router.get('/', errCheck(async function (req, res) {
    const {
      eager,
      ...where,
    } = req.query;

    res.send(await api[name].fetchAll({
      where,
      eager,
    }));
  }));

  router.post('/', errCheck(async function (req, res) {
    res
      .status(201)
      .send(await api[name].create(req.body));
  }));

  router.patch('/:id', errCheck(async function (req, res) {
    res.send(await api[name].update({id: req.params.id, ...req.body}));
  }));

  router.delete('/:id', errCheck(async function (req, res) {
    await api[name].delete(req.params.id);
    res.status(204).end();
  }));

  router.get('/:id', errCheck(async function (req, res) {
    res.send(await api[name].fetch(req.params.id));
  }));

  return router;
};
