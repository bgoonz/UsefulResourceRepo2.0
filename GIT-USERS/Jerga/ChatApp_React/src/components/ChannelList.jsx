import React from "react";
import Channel from "./Channel.jsx";

import Card from "material-ui/Card";
import List from "material-ui/List";

import { connect } from "react-redux";

import * as actions from "../actions/index.jsx";

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    //  this.getChannels();

    this.state = {
      channels: props.channels,
      selectedChannel: props.selectedChannel,
    };
  }

  // getChannels() {
  //     const {dispatch} = this.props;
  //     dispatch(actions.startFetchChannels());
  // }

  componentWillReceiveProps() {
    const { dispatch } = this.props;
    dispatch(actions.startFetchMessages());
  }

  handleChannelClick(channels) {}

  render() {
    if (!this.props.channels) {
      return (
        <Card
          style={{
            flexGrow: 1,
          }}
        >
          <p>...LOADING...</p>
        </Card>
      );
    }
    var channelNodes = _(this.props.channels)
      .keys()
      .map((k) => {
        let channel = this.props.channels[k];
        return <Channel key={channel.key} channel={channel} />;
      })
      .value();

    return (
      <Card
        style={{
          flexGrow: 1,
        }}
      >
        <List>{channelNodes}</List>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels,
  };
}

export default connect(mapStateToProps)(ChannelList);
