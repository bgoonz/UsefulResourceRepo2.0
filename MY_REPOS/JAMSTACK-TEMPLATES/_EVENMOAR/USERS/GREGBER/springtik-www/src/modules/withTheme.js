import {Component, PropTypes} from 'react';
import createElement from 'recompose/createElement';
import createHelper from 'recompose/createHelper';

const defaultSelector = ({theme}) => theme;

export default createHelper((selector = defaultSelector) => WrappedComponent => (
  class withTheme extends Component {
    static contextTypes = {
      insertCss: PropTypes.func.isRequired,
    };

    componentWillMount() {
      const theme = selector(this.props);

      if (theme._getCss) {
        this.removeCss = this.context.insertCss.call(undefined, theme);
      }
    }

    componentWillUnmount() {
      if (this.removeCss) {
        setTimeout(this.removeCss);
      }
    }

    render() {
      return createElement(WrappedComponent, this.props);
    }
  }
), 'withTheme');
