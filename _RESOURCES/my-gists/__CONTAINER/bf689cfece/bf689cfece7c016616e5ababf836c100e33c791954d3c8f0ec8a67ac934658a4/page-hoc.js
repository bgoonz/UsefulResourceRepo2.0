import { compose } from 'lodash/fp';
import withFeatures from './with-features';
import withEnv from './with-env';
import withLoader from './with-loader';
import withCoupon from './with-coupon';
import withLayout from './with-layout';
import withAuth from './with-auth';
import { withRouter } from 'next/router';
import withMagicLink from '../features/ethereum-authentication/with-magic-link';

export default compose(
  withEnv,
  withAuth,
  withLoader,
  withLayout({ showFooter: true }),
  withFeatures,
  withRouter,
  withCoupon,
  withMagicLink,
);