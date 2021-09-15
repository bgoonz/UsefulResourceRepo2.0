import React from "react";
import trim from "trim";
import { firebaseRef } from "../firebase/index.jsx";
import { connect } from "react-redux";
import * as actions from "../actions/index.jsx";

import { ListItem } from "material-ui/List";
import Card from "material-ui/Card";

class MessageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };
  }

  onChange(evt) {
    this.setState({
      message: evt.target.value,
    });
  }

  onKeyUp(evt) {
    if (evt.keyCode === 13 && trim(evt.target.value) != "") {
      evt.preventDefault();
      const { dispatch } = this.props;

      // const channelName = this.props.selectedChannel.key;
      //
      // firebaseRef.child(channelName).push({
      //     message: this.state.message
      // })

      dispatch(actions.startAddMessage(this.state.message));

      this.setState({
        message: "",
      });

      console.log("Sent a new message", evt.target.value);
    }
  }

  render() {
    return (
      <Card
        style={{
          maxWidth: 1200,
          margin: "30px auto",
          padding: "30px",
        }}
      >
        <textarea
          value={this.state.message}
          onChange={this.onChange.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
          style={{
            width: "100%",
            borderColor: "#D0D0D0",
            resize: "none",
            borderRadius: 3,
            minHeight: 50,
            color: "#555",
            fontSize: 14,
            outline: "auto 0px",
          }}
        />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedChannel: state.channels.selectedChannel,
  };
}

export default connect(mapStateToProps)(MessageBox);
