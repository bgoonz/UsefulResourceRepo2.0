import React, { useEffect } from 'react';
import hoistStatics from '../../HOCs/hoist-statics';
import { connect } from 'react-redux';
import {
  getShouldSignOut,
  setShouldSignOut,
  getDidAuthFail,
  signInStatusChanged,
  setMagicUser,
} from './ethereum-authentication-reducer';
import { getUser } from '../user-profile/user-profile-reducer';
import useMagicLink from './use-magic-link';
import PropTypes from 'prop-types';

const apiKey = 'pk_live_NOT_A_REAL_KEY_GET_YOUR_OWN';

const mapStateToProps = state => ({
  shouldSignOut: getShouldSignOut(state),
  ethDidAuthFail: getDidAuthFail(state),
  user: getUser(state),
});

const mapDispatchToProps = {
  setShouldSignOut,
  signInStatusChanged,
  setMagicUser,
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

const withMagicLink = Component => {
  const WithMagicLink = props => {
    const {
      shouldSignOut,
      setShouldSignOut,
      signInStatusChanged,
      setMagicUser,
    } = props;

    const { signIn, signOut, user } = useMagicLink(apiKey, signInStatusChanged);

    useEffect(() => {
      if (shouldSignOut) {
        setShouldSignOut(false);
        signOut();
      }
    }, [shouldSignOut]);

    useEffect(() => {
      setMagicUser(user);
    }, [user]);

    return (
      <Component
        {...props}
        magicLinkSignIn={signIn}
        magicLinkSignOut={signOut}
        isSignedInToMagic={user.isSignedIn}
        magicUser={user}
      />
    );
  };

  WithMagicLink.propTypes = {
    shouldSignOut: PropTypes.bool,
    setShouldSignOut: PropTypes.func,
    signInStatusChanged: PropTypes.func,
    setMagicUser: PropTypes.func,
  };

  return connectComponent(WithMagicLink);
};

export default hoistStatics(withMagicLink);
