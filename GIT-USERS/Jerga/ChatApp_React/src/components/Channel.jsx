import React from "react";
import { connect } from "react-redux";

import { ListItem } from "material-ui/List";
import * as actions from "../actions/index.jsx";

class Channel extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChannelClick() {
    const { dispatch } = this.props;
    dispatch(actions.channelOpened(this.props.channel));
  }

  render() {
    var channel = this.props.channel;
    console.log(channel);
    return (
      <ListItem onClick={this.handleChannelClick.bind(this)}>
        {channel.key}
      </ListItem>
    );
  }
}

export default connect()(Channel);
