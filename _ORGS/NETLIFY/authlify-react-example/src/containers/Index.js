import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { updateUser } from '../actions/auth';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.user || {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
  }

  handleToggleEdit() {
    this.setState({edit: !this.state.edit, email: this.props.user.email});
  }

  handleChange(field) {
    return (e) => {
      const state = {};
      state[field] = e.target.value;
      this.setState(state);
    }
  }

  handleDataChange(field) {
    return (e) => {
      const state = this.state.data || {};
      state[field] = e.target.value;
      this.setState({data: state});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(updateUser(this.state)).then(
      () => this.setState({edit: false}),
      (error) => this.setState({error: error.msg || error.toString()})
    )
  }

  form() {
    const { error, data } = this.state;

    return <form onSubmit={this.handleSubmit}>
      {error && <h3>Error updating profile: {error}</h3>}
      <p>
        <label>First Name: </label>
        <input onChange={this.handleDataChange('first_name')} value={data.first_name}/>
      </p>
      <p>
        <label>Last Name: </label>
        <input onChange={this.handleDataChange('last_name')} value={data.last_name}/>
      </p>
      <p>
        <label>Email: </label>
        <input type="email" value={this.state.email} onChange={this.handleChange('email')}/>
      </p>
      <p>
        <label>Password: </label>
        <input type="password" value={this.state.password} onChange={this.handleChange('password')}/>
      </p>
      <p>
        <button>Save</button> or <a href="#" onClick={this.handleToggleEdit}>cancel</a>
      </p>
    </form>;
  }

  profile() {
    const { user } = this.props;

    return <div>
      <p>First Name: {user.data.first_name}</p>
      <p>Last Name: {user.data.last_name}</p>
      <p>Email: {user.email}</p>
      <p>Created at: {user.created_at}</p>
    </div>;
  }

  render() {
    const { edit } = this.state;
    const { user } = this.props;

    if (!user) {
      return <h2>Login or signup to get started</h2>;
    }

    return <div>
      <h2>Profile <small><a href="#" onClick={this.handleToggleEdit}>edit</a></small></h2>
      {edit ? this.form() : this.profile()}
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

export default connect(mapStateToProps)(Index);
