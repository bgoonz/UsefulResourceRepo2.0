import React from 'react';
import createElement from 'recompose/createElement';
import createHelper from 'recompose/createHelper';

export default createHelper((contextTypes, subscribe) => Component => {
  return class ObservoSubscribe extends React.Component {
    static contextTypes = contextTypes;

    componentWillMount() {
      this.subscriptions = subscribe(this.context);
    }

    componentWillUnmount() {
      if (this.subscriptions.unsubscribe) {
        this.subscriptions.unsubscribe();
        return;
      }

      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }

    render() {
      return createElement(Component, this.props);
    }
  };
}, 'observoSubscribeHoc');
