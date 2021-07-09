// While I claim this is a drop-in replacement, it is a little bit slower.
// If you have hundreds of links, you might spend a few more milliseconds rendering the page on transitions.

// KNOWN ISSUES WITH THIS APPROACH:

// * This doesn't work great if you animate route changes with <TransitionGroup>
//   because the links are going to get updated immediately during the animation.
// * This might still not update the <Link> correctly for async routes,
//   as explained in https://github.com/reactjs/react-router/issues/470#issuecomment-217010985.

// However, you might find it useful for the rest of the use cases where you want <Link>s to re-render
// on route changes while preserving the optimizations that connect() from React Redux gives you.

// More info: https://github.com/reactjs/react-router/issues/470
// This solution is inspired by this comment by @geekyme: https://github.com/reactjs/react-router/issues/470#issuecomment-198440124

import React, { Component } from 'react';
import { withRouter, Link as RouterLink } from 'react-router';

export default class Link extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.router.listen(nextLocation => {
      if (this.location !== nextLocation) {
        this.location = nextLocation;
        this.forceUpdate();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <RouterLink {...this.props} />;
  }
}

export default withRouter(Link);
