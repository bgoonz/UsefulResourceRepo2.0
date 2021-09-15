import '~/modules/bootstrap';
import routes from './routes';
import api from './api';
import ServerAdapter from '~/modules/api-client/ServerAdapter';

export default ({req}) => {
  const adapter = new ServerAdapter({req});
  api.initialize(adapter);
  return routes;
};
