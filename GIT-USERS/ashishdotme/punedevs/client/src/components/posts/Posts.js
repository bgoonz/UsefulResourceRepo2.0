import React, { Component } from "react";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PostFeed from "./PostFeed";
class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let PostContent;
    if (posts == null || loading) {
      PostContent = <Spinner />;
    } else {
      PostContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {PostContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
