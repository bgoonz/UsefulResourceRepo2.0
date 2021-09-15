import React from 'react';
import { connect } from 'react-redux';
import { setConfig } from '../actions/config';
import { playback } from '../actions/playback';
import Term from './term';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: null,
      loading: false,
      sessions: [],
      session: null
    };
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleSelectSession = this.handleSelectSession.bind(this);
    this.handleUserchange = this.handleUserchange.bind(this);
    this.handlePasschange = this.handlePasschange.bind(this);
    this.handleRefreshSessions = this.handleRefreshSessions.bind(this);
    this.setCredentials = this.setCredentials.bind(this);
  }

  componentDidMount() {
    const { credentials } = this.props;

    if (credentials) {
      this.fetchSessions();
    }
  }

  componentDidUpdate(prevProps) {
    const old   = prevProps.credentials || {};
    const creds = this.props.credentials || {};

    if (creds && (creds.user !== old.user || creds.pass !== old.pass)) {
      this.fetchSessions();
    }
  }

  fetchSessions() {
    const { config, credentials } = this.props;

    this.setState({loading: true});

    fetch(config.logger, {
      headers: {Authorization: 'Basic ' + btoa(`${credentials.user}:${credentials.pass}`)}
    }).then((response) => response.json())
      .then((json) => {
        console.log('sessions: %o', json.Sessions);
        this.setState({
          sessions: json.Sessions,
          page: json.Page,
          total: json.Total,
          perPage: json.PerPage,
          loading: false
        });
      });
  }

  displayError() {
    return <div className="admin"><div className="admin-loader">
      <h3>Error:</h3>
      <p>{this.state.error}</p>
    </div></div>;
  }

  setCredentials(e) {
    e.preventDefault();

    const { user, pass } = this.state;
    this.setState({user: null, pass: null});
    this.props.setConfig({credentials: {user, pass}});
    sessionStorage.setItem('credentials', JSON.stringify({user, pass}));
  }

  handleUserchange(e) {
    this.setState({user: e.target.value});
  }

  handlePasschange(e) {
    this.setState({pass: e.target.value});
  }

  getCredentials() {
    return <div className="admin">
      <form onSubmit={this.setCredentials}>
        <p>
          <label>Username: <input onChange={this.handleUserchange}/></label>
        </p>
        <p>
          <label>Password: <input type="password" onChange={this.handlePasschange}/></label>
        </p>
        <p>
          <button>Login</button>
        </p>
      </form>
    </div>;
  }

  loading() {
    return <div className="admin"><div className="admin-loader">Loading...</div></div>;
  }

  session() {
    const { session, loading } = this.state;
    const { config } = this.props;

    if (loading || session.loading) { return this.loading(); }
    return <div className="admin">
      <div className="admin-header">
        <h3 className="admin-title">
          Playing back {session.ID} from {this.formatTime(session.CreatedAt)}
          <span> ({config.currentAction}/{config.totalActions})</span>
        </h3>
        <p><a href="#" onClick={this.handleGoBack}>Go back</a></p>
      </div>
      <div className="admin-body">
        <Term/>
      </div>
    </div>;
  }

  handleGoBack(e) {
    e.preventDefault();
    this.setState({loading: true, session: null});
    this.fetchSessions();
  }

  handleSelectSession(e, session) {
    e.preventDefault();
    this.setState({session: session});
    this.props.playback(session.UUID);
  }

  handleRefreshSessions(e) {
    e.preventDefault();
    this.fetchSessions();
  }

  formatTime(time) {
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ` +
           `${date.getHours()}:${date.getMinutes()} ` +
           `${date.toString().match(/\(([A-Za-z\s].*)\)/)[1]}`;
  }

  render() {
    const { loading, session, sessions, error } = this.state;
    const { credentials } = this.props;
    if (!credentials) { return this.getCredentials(); }
    if (error) { return this.displayError(); }
    if (loading) { return this.loading(); }
    if (session) { return this.session(); }

    return <div className="admin">
      <div className="admin-header">
        <p><a href="#" onClick={this.handleRefreshSessions}>Refresh Sessions</a></p>
      </div>
      <div className="admin-body">
        <ul className="admin-sessions">
          {sessions.map((session) => (
            <li key={session.ID} className="admin-session">
              <a href="#" onClick={(e) => this.handleSelectSession(e, session)}>
                <strong>Id: </strong> {session.ID}<br/>
                <strong>Time: </strong> {this.formatTime(session.CreatedAt)}<br/>
                <strong>Actions: </strong> {session.ActionCount}<br/>
                <strong>IP: </strong> {session.IP}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    config: state.config,
    credentials: state.config && state.config.credentials
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playback: (uuid) => dispatch(playback(uuid)),
    setConfig: (settings) => dispatch(setConfig(settings))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
