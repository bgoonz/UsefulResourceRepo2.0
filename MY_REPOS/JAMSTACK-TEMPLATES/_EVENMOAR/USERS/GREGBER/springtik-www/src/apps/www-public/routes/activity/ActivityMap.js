import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import Marker from 'react-google-maps/lib/Marker';
import Map from '~/modules/ui-components/Map';
import ActivityMapLoader from './ActivityMapLoader';
import styles from './ActivityMap.scss';

export const ActivityMap = ({
  position,
}) => (
  <section className={styles.activityMap}>
    {position ? (
      <ScriptjsLoader
        hostname={'maps.googleapis.com'}
        pathname={'/maps/api/js'}
        query={{
          key: 'AIzaSyD4LvvTGzD59YskRDoiK1xtn9bvyvXnLRQ',
        }}
        loadingElement={<ActivityMapLoader />}
        containerElement={<div className={styles.map} />}
        googleMapElement={
          <Map center={position}>
            <Marker position={position} />
          </Map>
        }
      />
    ) : (
      <ActivityMapLoader />
    )}
  </section>
);

ActivityMap.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityMap);
