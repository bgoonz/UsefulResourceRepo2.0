import React from "react";
import BaseLayout from "../components/BaseLayout.js";
import Cookie from "js-cookie";

import BlogEditor from "../components/slate-blog/BlogEditor";

import { Editor } from "slate-react";
import { Value } from "slate";

import * as actions from "../actions";
import withAuth from "../components/hoc/withAuth";

class BlogCreate extends React.Component {
  static async getInitialProps({ reduxStore, query }) {
    return { userId: query.id };
  }

  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
      blog: null,
    };

    this.saveBlog = this.saveBlog.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;

    if (userId) this.getBlogById(userId);
  }

  getBlogById = (userId) => {
    actions.getBlogById(userId).then((blog) => this.setState({ blog }));
  };

  saveBlog = (text, title) => {
    const { blog } = this.state;
    const user = JSON.parse(Cookie.get("user"));

    if (blog) this.updateBlog(text);

    const newBlog = {};
    if (user) newBlog.userId = user.sub;

    newBlog.story = text;
    newBlog.title = title;
    this.setState({ saving: true });

    actions
      .saveBlog(newBlog)
      .then((newBlog) => {
        this.setState({ saving: false });
      })
      .catch((err) => {
        this.setState({ saving: false });
      });
  };

  updateBlog = (text, publish) => {
    const { blog } = this.state;
    blog.text = text;
    if (publish) blog.publish = publish;

    actions
      .updateBlog(blog)
      .then((updatedBlog) => {})
      .catch((err) => {});
  };

  render() {
    const { userId } = this.props;
    const { blog } = this.state;

    return (
      <BaseLayout>
        <section className="blogCreate-page">
          <div className="container">
            <h1 className="portfolio-page-title">WRITE YOUR STORY...</h1>
            <div className="editor">
              <BlogEditor
                {...this.state}
                save={this.saveBlog}
                update={this.updateBlog}
              />
            </div>
          </div>
        </section>
      </BaseLayout>
    );
  }
}

export default withAuth(BlogCreate);
