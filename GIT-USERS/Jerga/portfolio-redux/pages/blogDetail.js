import React from "react";
import BaseLayout from "../components/BaseLayout.js";

import { connect } from "react-redux";

import * as actions from "../actions";

import FbComment from "../components/FbComment";

class BlogDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  static async getInitialProps({ reduxStore, query, req }) {
    console.log(req);
    const url = req
      ? `${req.protocol}://${req.get("Host")}${req.originalUrl}`
      : null;

    try {
      const blog = await actions.getBlogBySlug(req, query.slug);

      return { blog, url };
    } catch (err) {
      return { err };
    }
  }

  // componentDidMount() {
  //   const { slug } = this.props;

  //   actions.getBlogBySlug(slug).then(
  //     (blog) => {
  //       this.setState({content: blog.story});
  //     })
  //   .catch(err => console.error(err));
  // }

  render() {
    const { blog } = this.props;

    const url = this.props.url || window.location.href;

    return (
      <BaseLayout>
        <section className="blogDetail-page">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div dangerouslySetInnerHTML={{ __html: blog.story }}></div>
                <FbComment url={url} />
              </div>
            </div>
          </div>
        </section>
      </BaseLayout>
    );
  }
}

export default BlogDetail;
