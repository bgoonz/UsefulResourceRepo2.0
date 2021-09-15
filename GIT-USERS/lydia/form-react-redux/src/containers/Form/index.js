import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  updateName,
  updateEmail,
  updateMessage
} from './actions';

class Form extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    //Action creators
    updateName: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
  }
  render() {
    const formInfo = {
      name: this.props.name,
      email: this.props.email,
      message: this.props.message
    };

    return (
      <div className="Form">
        <Input label="name" onChangeHandler={this.props.updateName} value={this.props.name} />
        <Input label="email" onChangeHandler={this.props.updateEmail} value={this.props.email} />
        <Input label="message" onChangeHandler={this.props.updateMessage} value={this.props.message} />
        <Button formInfo={formInfo} />
      </div>
    );
  }
}

//mapStoreStateToFormProps
const mapStateToProps = (state) => {
  console.log(state)
  return {
    name: state.form.name,
    email: state.form.email,
    message: state.form.message
  };
}

//mapActionCreatorsToFormProps
//dispatch = function that returns an action creator
const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    updateName: (name) => dispatch(updateName(name)),
    updateEmail: (email) => dispatch(updateEmail(email)),
    updateMessage: (message) => dispatch(updateMessage(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
