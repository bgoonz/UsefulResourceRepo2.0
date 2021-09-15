import '~/modules/bootstrap';
import {worker} from '../jobs/hello';

worker()
  .catch(e => {
    setTimeout(() => {
      throw e;
    });
  });
