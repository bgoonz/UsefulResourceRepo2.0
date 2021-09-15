import React, { Component } from 'react';
// import { connect } from 'react-redux';

import PostDetail from './PostDetail';

class PostList extends Component {
  async componentDidMount() {
    await this.props.postsFetch();
  }

  render() {
    console.log(this.props.posts);
    return (
      <>
        <ol>
          {this.props &&
            this.props.posts.map(({ title, id }) => (
              <PostDetail key={id} title={title} />
            ))}
        </ol>
      </>
    );
  }
}

export default PostList;
// const mapStateToProps = (state) => ({
//   posts: state.postReducer
// });

// export default connect(mapStateToProps)(PostList);
