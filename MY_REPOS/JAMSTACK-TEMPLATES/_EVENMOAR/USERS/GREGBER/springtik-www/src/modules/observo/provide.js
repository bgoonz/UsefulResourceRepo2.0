import React, {PropTypes} from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import createElement from 'recompose/createElement';
import createHelper from 'recompose/createHelper';

export default createHelper(getObservables => Component => {
  return class ObservoProvide extends React.Component {
    static propTypes = {
      routes: PropTypes.arrayOf(PropTypes.object),
      route: PropTypes.object,
    };

    static contextTypes = {
      observo: PropTypes.object,
    };

    static childContextTypes = {
      observo: PropTypes.object.isRequired,
    };

    props$ = new BehaviorSubject(this.props);

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const {
        observo = {},
      } = this.context;

      const childObservables = getObservables({
        ...observo.observables,
        props$: this.props$,
      });

      this.childContext = {
        observo: {
          ...observo,
          observables: {
            ...observo.observables,
            ...childObservables,
          },
        },
      };
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps);
    }

    render() {
      return createElement(Component, this.props);
    }
  };
}, 'observoProvide');
