import React from 'react';

export default (contextTypes, subscribe) => {
  return class ObservoSubscribe extends React.Component {
    static contextTypes = contextTypes;

    componentWillMount() {
      const subscriptions = subscribe(this.context);
      this.subscriptions = Array.isArray(subscriptions)
        ? subscriptions : [subscriptions];
    }

    componentWillUnmount() {
      this.subscriptions.forEach(subscription =>
        (subscription.dispose || subscription.unsubscribe).call(subscription));
    }

    shouldComponentUpdate() {
      return false;
    }

    render() {
      return null;
    }
  };
};
