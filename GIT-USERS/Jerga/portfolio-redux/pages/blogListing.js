import React from "react";
import BaseLayout from "../components/BaseLayout.js";
import { Link } from "../routes";

import moment from "moment";

import * as actions from "../actions";

class BlogListing extends React.Component {
  static async getInitialProps({ req }) {
    try {
      const data = await actions.getAllBlogs(req);

      return { blogs: data };
    } catch (err) {
      return { err };
    }
  }

  renderBlogs(blogs) {
    if (blogs && blogs.length > 0) {
      return blogs.map((blog, index) => {
        return (
          <React.Fragment key={index}>
            <div className="post-preview">
              <Link route={`/blogs/${blog.slug}`}>
                <a>
                  <h2 className="post-title">{blog.title}</h2>
                  <h3 className="post-subtitle">{blog.subTitle}</h3>
                </a>
              </Link>
              <p className="post-meta">
                Posted by
                <a href="#"> {blog.author} </a>
                {blog.updatedAt && moment(blog.updatedAt).format("LLLL")}
              </p>
            </div>
            <hr></hr>
          </React.Fragment>
        );
      });
    }

    return null;
  }

  render() {
    const { blogs } = this.props;

    return (
      <BaseLayout headerType={"landing"}>
        <section className="blogListing-page">
          <header
            className="masthead"
            style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
          >
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="site-heading">
                    <h1>Newest Blogs</h1>
                    <span className="subheading">Read some blogs...</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                {this.renderBlogs(blogs)}
                <div className="clearfix">
                  <a className="btn btn-primary float-right" href="#">
                    Older Posts &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <ul className="list-inline text-center">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">
                    Copyright &copy; Your Website 2018
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </BaseLayout>
    );
  }
}

export default BlogListing;
