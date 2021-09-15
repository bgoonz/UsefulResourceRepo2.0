import React from 'react';
import createElement from 'recompose/createElement';
import createHelper from 'recompose/createHelper';

export default createHelper(initialState => Component => (
  class ObservoServerStateInjector extends React.Component {
    static childContextTypes = {
      observo: React.PropTypes.object.isRequired,
    };

    getChildContext() {
      return {
        observo: {
          initialState,
          server: true,
        },
      };
    }

    render() {
      return createElement(Component, this.props);
    }
  }
), 'observoServerInjectState');
