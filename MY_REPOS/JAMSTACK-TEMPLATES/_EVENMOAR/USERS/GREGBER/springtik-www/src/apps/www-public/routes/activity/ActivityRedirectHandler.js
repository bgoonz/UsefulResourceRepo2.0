import {PropTypes} from 'react';
import subscribe from '~/modules/observo/subscribe';

export default subscribe({
  observo: PropTypes.shape({
    observables: PropTypes.shape({
      redirect$: PropTypes.object.isRequired,
    }).isRequired,
  }),
  redirect: PropTypes.func.isRequired,
}, ({
  observo,
  redirect,
}) =>
  observo.observables.redirect$
    .subscribe(url => {
      if (url)
        redirect(301, url);
    })
);
