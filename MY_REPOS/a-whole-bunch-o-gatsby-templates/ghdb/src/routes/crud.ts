import { Next, Request, Response } from 'restify';
import RestifyRouter = require('restify-router');

import { DataService } from '../services/data.service';

export const CrudRouter = new RestifyRouter.Router();
export const CrudRouterPrefix = '/crud';

CrudRouter.get('/:collection', (req: Request, res: Response, next: Next) => {
  const dataSet = DataService.json;
  const { collection } = req.params;

  if (dataSet.hasOwnProperty(collection)) {
    res.status(200);
    res.json({
      [collection]: dataSet[collection],
      total: dataSet[collection].length
    });
  } else {
    res.status(404);
    res.json({
      message: `Collection ${collection} Not Found`
    });
  }
});

CrudRouter.get(
  '/:collection/:id',
  (req: Request, res: Response, next: Next) => {
    const dataSet = DataService.json;
    const { collection, id } = req.params;

    const propName = isNaN(id) ? 'id' : 'index';
    if (dataSet.hasOwnProperty(collection)) {
      const data = dataSet[collection];

      if (Array.isArray(data)) {
        res.status(200);
        res.json({
          [collection]: dataSet[collection].filter(
            (c: any) => c[propName] === id
          ),
          total: dataSet[collection].filter((c: any) => c[propName] === id)
            .length
        });
      } else {
        res.status(200);
        res.json({
          [collection]: dataSet[collection],
          total: undefined
        });
      }
    } else {
      res.status(404);
      res.json({
        message: `Collection ${collection} Not Found`
      });
    }
  }
);

CrudRouter.post('/:collection', (req: Request, res: Response, next: Next) => {
  res.json({
    message: 'Collection Route :: ' + req.params.collection
  });
});

CrudRouter.post(
  '/:collection/:id',
  (req: Request, res: Response, next: Next) => {
    res.json({
      message:
        'Collection Id Route :: ' +
        (req.params.collection + ' / ' + req.params.id)
    });
  }
);

CrudRouter.put('/:collection', (req: Request, res: Response, next: Next) => {
  res.json({
    message: 'Collection Route :: ' + req.params.collection
  });
});

CrudRouter.put(
  '/:collection/:id',
  (req: Request, res: Response, next: Next) => {
    res.json({
      message:
        'Collection Id Route :: ' +
        (req.params.collection + ' / ' + req.params.id)
    });
  }
);

CrudRouter.del('/:collection', (req: Request, res: Response, next: Next) => {
  res.json({
    message: 'Collection Route :: ' + req.params.collection
  });
});

CrudRouter.del(
  '/:collection/:id',
  (req: Request, res: Response, next: Next) => {
    res.json({
      message:
        'Collection Id Route :: ' +
        (req.params.collection + ' / ' + req.params.id)
    });
  }
);
