import React from "react";
import { MuiThemeProvider } from "material-ui/styles";
import PropTypes from "prop-types";
import Reboot from "material-ui/Reboot";
import injectSheet from "react-jss";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import theme from "./styles/theme";
import globals from "./styles/global";

import Loading from "./components/shared/Loading/";

const AsyncHome = Loadable({
  loader: () => import("./components/Home/"),
  loading: Loading
});
const AsyncBrowser = Loadable({
  loader: () => import("./components/Browser/"), // /* webpackChunkName: "browser" */
  loading: Loading
});
const AsyncSubscribe = Loadable({
  loader: () => import("./components/Subscribe/"),
  loading: Loading
});
const AsyncNav = Loadable({
  loader: () => import("./components/Nav/"),
  loading: Loading
});

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unseenCombos: [],
      seenCombos: [],
      activeCombo: null,
      nextActiveCombo: null,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      subscription: false,
      subscriptionConfirmed: false
    };

    this.windowResizeHandler = this.windowResizeHandler.bind(this);
    this.changeActiveCombo = this.changeActiveCombo.bind(this);
    this.updateSubscription = this.updateSubscription.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.windowResizeHandler, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResizeHandler, false);
  }

  windowResizeHandler() {
    this.setState(() => ({
      windowWidth: document.documentElement.clientWidth, // || window.innerWidth,
      windowHeight: document.documentElement.clientHeight //|| window.innerHeight
    }));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.combosQuery.allComboes !== prevProps.combosQuery.allComboes &&
      this.props.combosQuery.allComboes.length
    ) {
      const newStateValues = this.drawNewActiveCombo(this.props.combosQuery.allComboes);

      this.setState(() => ({
        unseenCombos: newStateValues.unseenCombos,
        seenCombos: newStateValues.seenCombos,
        activeCombo: newStateValues.activeCombo,
        nextActiveCombo: newStateValues.nextActiveCombo
      }));
    }
  }

  changeActiveCombo() {
    const newStateValues = this.drawNewActiveCombo();

    this.setState(() => ({
      unseenCombos: newStateValues.unseenCombos,
      seenCombos: newStateValues.seenCombos,
      activeCombo: newStateValues.activeCombo,
      nextActiveCombo: newStateValues.nextActiveCombo
    }));
  }

  getRandomElementOfArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  drawNewActiveCombo(combos) {
    const unseenCombos = combos || this.state.unseenCombos;
    const seenCombos = this.state.seenCombos;
    const nextActiveCombo = this.state.nextActiveCombo;
    let newActiveCombo;

    if (nextActiveCombo) {
      newActiveCombo = nextActiveCombo;
    } else {
      newActiveCombo = this.getRandomElementOfArray(unseenCombos);
    }

    const newActiveComboIndex = unseenCombos.findIndex(combo => combo.id === newActiveCombo.id);

    const newUnseenCombos = [...unseenCombos];
    newUnseenCombos.splice(newActiveComboIndex, 1);

    const newNextActiveCombo = this.getRandomElementOfArray(newUnseenCombos);

    const newSeenCombos = [...seenCombos, newActiveCombo];

    return {
      unseenCombos: newUnseenCombos,
      seenCombos: newSeenCombos,
      activeCombo: newActiveCombo,
      nextActiveCombo: newNextActiveCombo
    };
  }

  updateSubscription = (subscription, subscriptionConfirmed) => {
    this.setState({
      subscription: subscription,
      subscriptionConfirmed: subscriptionConfirmed
    });
  };

  render() {
    const { windowWidth, windowHeight, unseenCombos, seenCombos } = this.state;

    if (this.props.combosQuery && this.props.combosQuery.loading) {
      return <Loading />;
    }
    if (this.props.combosQuery && this.props.combosQuery.error) {
      return <Loading error={true} />;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Switch>
          <Route exact path="/" render={({ history }) => <AsyncHome history={history} />} />
          <Route
            exact
            path="/browse"
            render={() => (
              <AsyncBrowser
                combo={this.state.activeCombo}
                nextCombo={this.state.nextActiveCombo}
                windowWidth={windowWidth}
                windowHeight={windowHeight}
              />
            )}
          />
          <Route
            exact
            path="/subs"
            render={() => (
              <AsyncSubscribe
                subscription={this.state.subscription}
                subscriptionConfirmed={this.state.subscriptionConfirmed}
                updateSubscription={this.updateSubscription}
              />
            )}
          />
        </Switch>
        <AsyncNav
          onNextClick={this.changeActiveCombo}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          unseenCombos={unseenCombos.length}
          seenCombos={seenCombos.length}
        />
      </MuiThemeProvider>
    );
  }
}

const COMBOS_QUERY = gql`
  query CombosQuery {
    allComboes {
      id
      entry {
        text
      }
      meaning {
        id
        definition
        type
        key
      }
      picture {
        id
        arangoKey
        hash
        sourceName
        sourceUrl
        authorName
        authorUrl
        licenceName
        licenceUrl
      }
      spot {
        id
        height
        width
        x
        y
        key
      }
      sentences {
        id
        text
      }
    }
  }
`;

AppContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  combosQuery: PropTypes.object.isRequired
};

export default graphql(COMBOS_QUERY, { name: "combosQuery" })(injectSheet(globals)(AppContainer));
