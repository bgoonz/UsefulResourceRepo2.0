import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
// import { postAdd } from '../reducers/postReducer';
import styles from './PostInput.module.css';

class PostInput extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: nanoid(),
      userId: nanoid(),
      title: this.state.title,
      body: this.state.body
    };

    this.props.postAdd(post);
    this.handleReset();
  };

  handleReset = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

  render() {
    return (
      <div className={styles.inputBox}>
        <h1>Create Post</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.title}
            placeholder="Title"
            name="title"
          />
          <textarea
            onChange={this.handleChange}
            value={this.state.body}
            name="body"
            placeholder="Add Your Entry"
          ></textarea>
          <button type="submit">Submit Post</button>
        </form>
      </div>
    );
  }
}

export default PostInput;

// const mapDispatchToProps = (dispatch) => ({
//   postAdd: (post) => dispatch(postAdd(post))
// });

// export default connect(null, mapDispatchToProps)(PostInput);
