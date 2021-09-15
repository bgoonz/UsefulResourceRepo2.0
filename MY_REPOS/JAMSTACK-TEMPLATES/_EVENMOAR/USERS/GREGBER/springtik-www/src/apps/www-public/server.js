import '~/modules/bootstrap';
import routes from './routes';
import graphQLClient from './graphQLClient';

export default ({graphQLClientAdapter}) => {
  graphQLClient.useAdapter(graphQLClientAdapter);
  return routes;
};
