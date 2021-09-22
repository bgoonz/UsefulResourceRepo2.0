import React from "react";
import Message from "./Message.jsx";

import { connect } from "react-redux";

import Card from "material-ui/Card";
import List from "material-ui/List";
import _ from "lodash";

import * as actions from "../actions/index.jsx";

import { firebaseRef } from "../firebase/index.jsx";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      isActive: false,
    };

    //this.getMessages();

    // if (this.props.channels.selectedChannel.key) {
    //
    //     firebaseRef.child(`${this.props.channels.selectedChannel.key}`).on("child_added", (msg) => {
    //         if (this.state.messages[msg.key]) {
    //             return;
    //         }
    //
    //         let msgVal = msg.val();
    //         msgVal.key = msg.key;
    //         this.state.messages[msgVal.key] = msgVal;
    //         this.setState({messages: this.state.messages});
    //     });

    // firebaseRef.child("messages").on("child_removed", (msg) => {
    //     var key = msg.key;
    //     delete this.state.messages[key];
    //     this.setState({messages: this.state.messages});
    // });
    //}
  }

  // getMessages(){
  //     const {dispatch} = this.props;
  //     dispatch(actions.startFetchMessages());
  // };
  //
  render() {
    var messageNodes = _.values(this.props.messages).map((message) => {
      return <Message message={message.message} />;
    });

    return (
      <Card
        style={{
          flexGrow: 2,
          marginLeft: "30px",
        }}
      >
        <List>{messageNodes}</List>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels,
    messages: state.messages,
  };
}

export default connect(mapStateToProps)(MessageList);
