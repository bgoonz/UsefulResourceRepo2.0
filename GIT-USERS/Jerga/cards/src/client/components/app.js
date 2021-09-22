import "./app.scss";

import React from "react";
import { ContainerBase } from "../lib/component";
import dialogTypes from "./dialogs";
import * as A from "../../server/shared/actions";

class AppContainer extends ContainerBase {
  componentWillMount() {
    const {
      stores: { app },
      services: { dispatcher },
    } = this.context;
    const { router } = this.props;
    this.subscribe(app.dialogs$, (dialogs) => {
      this.setState({ dialogs });
    });

    this.subscribe(dispatcher.onSuccess$(A.GAME_JOIN), (action) => {
      const path = `/game/${action.gameId}`;
      if (router.location.pathname == path) {
        return;
      }

      router.push(path);
    });

    this.subscribe(dispatcher.onSuccess$(A.LOBBY_JOIN), () => {
      if (router.location.pathname == "/") return;

      router.push("/");
    });
  }

  render() {
    const { main, sidebar } = this.props;
    const { dialogs } = this.state;

    const dialogStack = dialogs.map((dialog) => {
      const DialogComponent = dialogTypes[dialog.id];
      return <DialogComponent {...dialog.props} key={dialog.id} />;
    });

    return (
      <div
        className={`c-application ${
          dialogStack.length ? "dialogs-open" : "dialogs-closed"
        }`}
      >
        <div className="dialogs">{dialogStack}</div>
        <div className="inner">
          <div className="sidebar">{sidebar}</div>
          <div className="main">{main}</div>
        </div>
      </div>
    );
  }

  _click() {
    console.log("STUFF!!");
  }
}

export default AppContainer;
