import React from "react";
import BaseLayout from "../components/BaseLayout.js";
import Cookie from "js-cookie";
import { Router } from "../routes";

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
    window.addEventListener("keydown", this.handleKeyDown);

    const { userId } = this.props;

    if (userId) this.getBlogById(userId);
  }

  getBlogById = (userId) => {
    actions.getBlogById(userId).then((blog) => this.setState({ blog }));
  };

  saveBlog = (text, heading) => {
    const { blog } = this.state;

    if (blog) {
      this.updateBlog(text, heading);
      return;
    }

    const user = JSON.parse(Cookie.get("user"));
    const newBlog = {};
    newBlog.story = text;
    newBlog.title = heading.title;
    newBlog.subTitle = heading.subTitle;

    if (user) {
      newBlog.userId = user.sub;
      newBlog.author = user.name;
    }

    this.setState({ isSaving: true });

    actions
      .saveBlog(newBlog)
      .then((newBlog) => {
        Router.pushRoute(`/blogs/${newBlog._id}/edit`);
        this.setState({ blog: newBlog, isSaving: false });
      })
      .catch((err) => {
        this.setState({ isSaving: false });
      });
  };

  updateBlog = (text, heading, publish) => {
    const { blog } = this.state;
    blog.story = text;
    blog.title = heading.title;
    blog.subTitle = heading.subTitle;

    if (publish) blog.status = "published";

    this.setState({ isSaving: true });
    actions
      .updateBlog(blog)
      .then((updatedBlog) => {
        this.setState({ isSaving: false });
      })
      .catch((err) => {
        this.setState({ isSaving: false });
      });
  };

  render() {
    const { userId } = this.props;
    const { blog } = this.state;

    const loadInitialData = userId ? false : true;

    return (
      <BaseLayout>
        <section className="blogCreate-page">
          <div className="container">
            <h1 className="portfolio-page-title">WRITE YOUR STORY...</h1>
            <div className="editor">
              <BlogEditor
                {...this.state}
                loadInitialData={loadInitialData}
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
