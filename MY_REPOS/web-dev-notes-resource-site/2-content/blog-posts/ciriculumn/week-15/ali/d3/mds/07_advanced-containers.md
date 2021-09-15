
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Advanced Containers

While you learned in an earlier article that you should aim to have very few
containers, there are exceptions. When you finish this article, you should be
able to describe a situation where defining multiple containers for a single
component is advantageous.

## Knowing when to break the rules

Separating your concerns with presentational and container components allows you
to reuse presentational components where it makes sense, rather than duplicating
code. If a presentational component needs different data in each situation,
though, you may need more containers. By creating more container components, you
can render the same presentational component with each of those containers to
suit different needs.

Consider a form component that may either _create_ or _edit_ a post. The form
itself looks and works the same in both cases; it has a few inputs and a submit
button. The use cases differ, though, in that the edit form needs to map state
from the store to its props, while the create form does not. Furthermore, the
edit form will need to dispatch a different action when the form submits than
the create form will, as well as request the object from our backend.

**As you go through the code snippets below, read the comments carefully.**

Here's the presentational component, `PostForm`:

```js
// PostForm.js

import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    // set up initial state
    this.state = this.props.post; // a Post object has a title and a body
  }

  static getDerivedStateFromProps(props, state) {
    // if we get a different post in props, we'll need to set state
    if (props.post.id !== state.id) {
      return props.post;
    }
  }

  update = (field) => {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // `submit` will be a thunk action that presumably creates or edits a post
    this.props.submit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title
          <input
            type="text"
            onChange={this.update("title")}
            value={this.state.title}
          />
        </label>

        <label>
          Body
          <input
            type="text"
            onChange={this.update("body")}
            value={this.state.body}
          />
        </label>

        <button>Submit Post</button>
      </form>
    );
  }
}

export default PostForm;
```

You can see that `PostForm` is expecting two things in props: a `post` object
and a `submit` function. The container will have to define these, since right
now, this form can't actually do anything. Give it the ability to create a post:

```js
// CreatePostFormContainer.js

import { connect } from 'react-redux';
import PostForm from './PostForm';
import { createPost } from '../actions/postActions';

const mapStateToProps = state => {
  return {
    post: { title: '', body: '' } // a default blank object
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: post => dispatch(createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
```

So far, this is nothing new. Now, wherever you need a form to create a post, you
can render `CreatePostFormContainer` by importing from the above file.

But what about editing? This is a little trickier, because you need more
information from the store - so you'll need a [higher-order component] to help
you out. Higher-order components are a useful React pattern that essentially
uses a component to render another component, usually to handle some sort of
work and pass in data. This pattern allows us to keep your components small and
modular. Here, you'll use a higher-order component to fetch the post you want to
edit and pass it into the `PostForm`:

```js
// EditPostFormContainer.js

import React from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { fetchPost, updatePost } from '../actions/postActions';
import { selectPost } from '../reducers/postSelectors';

const mapStateToProps = (state, ownProps) => {
  const defaultPost = { title: '', body: '' };
  const post = selectPost(ownProps.match.params.postId) || defaultPost;
  // get the post this route is asking for
  // (assuming here that this component is being rendered by a route)
  // if you don't have the post in state yet, return a blank post so PostForm doesn't break
  return { post };
};

const mapDispatchToProps = dispatch => {
  // an edit form will need to fetch the relevant post, but the PostForm shouldn't handle that
  // you'll handle this problem with a higher-order component, EditPostFormContainer
  return {
    fetchPost: id => dispatch(fetchPost(id)),
    submit: post => dispatch(updatePost(post))
  };
};

class EditPostForm extends React.Component {
  // this is the higher-order component made to handle the fetch

  componentDidMount() {
    // do the fetching here so that PostForm doesn't have to
    this.props.fetchPost(this.props.match.params.postId);
  }

  render() {
    // destructure the props so you can easily pass them down to PostForm
    const { post, submit } = this.props;
    return <PostForm post={post} submit={submit} />;
  }
}

// now `connect` it to the Redux store

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostForm);
```

The result here is that we can render a `CreatePostFormContainer` wherever you
want a form to create a post, and an `EditPostFormContainer` wherever you want
to edit a post. Both components will render a `PostForm`, but each will have
different functions. The `PostForm` also gets to be very simple and make almost
no decisions. This helps keep your code DRY and modular.

You can use this pattern with any presentational component that needs to be
connected to the store, but may need entirely different data to perform
different functions.

## What you learned

In this article, you learned about a situation where defining multiple
containers for a single component is advantageous.

[higher-order component]: https://spin.atomicobject.com/2017/03/02/higher-order-components-in-react/
