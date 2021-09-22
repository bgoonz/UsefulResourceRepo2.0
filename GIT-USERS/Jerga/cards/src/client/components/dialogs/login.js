import "./login.scss";

import React from "react";
import * as A from "../../actions";
import { ContainerBase } from "../../lib/component";
import { TextInput } from "../controls";

class LoginDialog extends ContainerBase {
  constructor(props) {
    super(props);
    this._close = (e) => {
      e.preventDefault();
      this.dispatch(A.dialogSet(A.DIALOG_LOGIN, false));
    };

    this._login = (e) => {
      e.preventDefault();
      this.request(A.userLogin(this._username.value));
    };
  }

  componentWillMount() {
    const {
      stores: { user },
    } = this.context;
    debugger;
    this.subscribe(user.opLogin$, (opLogin) => this.setState({ opLogin }));
    this.subscribe(user.details$, (details) => {
      if (details.isLoggedIn) {
        this.dispatch(A.dialogSet(A.DIALOG_LOGIN, false));
      }
    });
  }

  componentDidMount() {
    this._username.input.focus();
  }

  render() {
    const { opLogin } = this.state;
    const disabled = opLogin.inProgress;

    return (
      <section className="c-login-dialog">
        <h1>Login</h1>
        <form onSubmit={this._login} disabled={disabled}>
          <div className="form-row">
            <TextInput
              placeholder="username"
              ref={(c) => (this._username = c)}
              disabled={disabled || !opLogin.can}
            />
          </div>
          {!opLogin.error ? null : <p className="error">{opLogin.error}</p>}
          <div className="submit-row">
            <button
              className="m-button good"
              disabled={disabled || !opLogin.can}
            >
              {" "}
              login{" "}
            </button>
            <button className="m-button close-button" onClick={this._close}>
              close{" "}
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default {
  id: A.DIALOG_LOGIN,
  component: LoginDialog,
};
