import {PropTypes} from 'react';
import subscribe from '~/modules/observo/subscribe';

export default subscribe({
  observo: PropTypes.shape({
    observables: PropTypes.shape({
      result$: PropTypes.object.isRequired,
    }).isRequired,
  }),
  $window: PropTypes.shape({
    open: PropTypes.func.isRequired,
  }).isRequired,
}, ({
  observo,
  $window,
}) =>
  observo.observables.result$
    .subscribe(({
      success,
    }) => {
      if (success) {
        $window.open('/', '_self');
      }
    })
);
