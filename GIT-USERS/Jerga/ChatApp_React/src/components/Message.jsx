import React from "react";

import { ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        disabled={true}
        leftAvatar={
          <Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg" />
        }
      >
        {this.props.message}
      </ListItem>
    );
  }
}

export default Message;
