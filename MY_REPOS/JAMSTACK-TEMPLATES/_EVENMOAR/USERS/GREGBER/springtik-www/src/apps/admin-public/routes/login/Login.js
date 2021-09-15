import React, {
  Component,
  PropTypes,
} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import autofill from 'react-autofill';
import Shield from '~/modules/ui-components/Shield';
import TextBox from '~/modules/ui-components/TextBox';
import Button from '~/modules/ui-components/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import FaUser from 'react-icons/lib/fa/user';
import FaLock from 'react-icons/lib/fa/lock';
import {
  USERNAME_NOT_FOUND,
  INCORRECT_PASSWORD,
} from '~/modules/loginErrors';
import createProvider from './Login.obs';
import styles from './Login.scss';
import LoginRedirectionHandler from './LoginRedirectionHandler';

const getErrorMessage = ({
  error,
  output: {
    message,
  } = {},
}) => {
  if (error) {
    return 'Désolé, une erreur est survenue.';
  }

  switch (message) {
    case USERNAME_NOT_FOUND:
      return 'Aucun compte ne correspond à votre email.';
    case INCORRECT_PASSWORD:
      return 'Mot de passe incorrect.';
  }

  return null;
};

export class Login extends Component {
  handleChange = event => {
    this.props.onChange({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.props.model);
  };

  render() {
    const {
      model,
      result = {},
    } = this.props;

    const errorMessage = getErrorMessage(result);

    return (
      <div className={styles.login}>
        <LoginRedirectionHandler />
        <div className={styles.shield}>
          <Shield />
        </div>
        <div className={styles.panel}>
          <div className={styles.title}>
            Connexion à l'admin
          </div>
          {errorMessage ? (
            <div className={styles.error}>
              {errorMessage}
            </div>
          ) : null}
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <TextBox
              name="email"
              type="email"
              placeholder="Email"
              value={model.email}
              onChange={this.handleChange}
              autoFocus
              required
              icon={<FaUser size={20} className={styles.icon} />}
              bordered
              block
              spaced
            />
            <TextBox
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={model.password}
              onChange={this.handleChange}
              required
              icon={<FaLock size={20} className={styles.icon} />}
              bordered
              block
              spaced
            />
            <Button
              type="submit"
              theme="admin"
              disabled={result.progress}
              block
            >
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  model: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  result: PropTypes.shape({
    progress: PropTypes.bool,
    error: PropTypes.bool,
    success: PropTypes.bool,
    output: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

export default compose(
  withStyles(styles),
  provide(createProvider()),
  connect(({
    model$,
    submit$,
    result$,
  }) => ({
    model: model$,
    onChange: model$,
    onSubmit: submit$,
    result: result$,
  })),
  autofill,
  pure,
)(Login);
