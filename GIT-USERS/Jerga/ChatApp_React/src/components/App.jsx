import React from "react";

import MessageList from "./MessageList.jsx";
import ChannelList from "./ChannelList.jsx";
import MessageBox from "./MessageBox.jsx";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as Colors from "material-ui/styles/colors";
import AppBar from "material-ui/AppBar";

import { firebaseRef } from "../firebase/index.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: Colors.blue500,
        primary2Color: Colors.blue700,
        primary3Color: Colors.blue100,
        primary4Color: Colors.pink400,
      },
    });
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  render() {
    return (
      <div>
        <AppBar title="My Awesome Personal Chat App in React-Redux + Firebase" />
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            maxWidth: 1200,
            width: "100%",
            margin: "30px auto 30px",
          }}
        >
          <ChannelList />
          <MessageList />
        </div>
        <MessageBox />
      </div>
    );
  }
}

export default App;
