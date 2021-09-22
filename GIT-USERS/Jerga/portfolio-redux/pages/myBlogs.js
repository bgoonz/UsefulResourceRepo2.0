// import React from 'react';
// import BaseLayout from '../components/BaseLayout.js';
// import { connect } from 'react-redux';

// import * as actions from '../actions';
// import { Link } from '../routes';
// import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
// import PortButtonDropdown from '../components/ButtonDropdown';

// class MyBlogs extends React.Component {

//   // static async getInitialProps({reduxStore, query}) {

//   //   // console.log(reduxStore.getState());

//   //   // if (reduxStore) {

//   //   // }

//   //   console.log('Hell Yea!')
//   //   console.log(query);
//   // }

//   constructor(props) {
//     super(props);

//     this.state = {
//       published: [],
//       drafts: [],
//       reload: false
//     }
//   }

//   componentDidMount() {
//     const { dispatch, user } = this.props;

//     actions.getMyBlogs(user.sub).then(
//       blogs => {
//         this.separateBlogs(blogs);
//       })
//     .catch(() => {

//     });
//   }

//   separateBlogs(blogs) {
//     const published = [];
//     const drafts = [];

//     blogs.forEach((blog) => {
//       blog.status === 'draft' ? drafts.push(blog) : published.push(blog);
//     });

//     this.setState({
//       published,
//       drafts
//     })
//   }

//   changeBlogState = (blog, blogState, index) => {
//     blog.status = blogState.value.toLowerCase();

//     actions.updateBlog(blog).then(
//       () => {
//         this.updateBlogsState(blog, index);
//       }
//     ).catch(err => console.error(err));
//   }

//   deleteBlog = (blogId) => {
//     // Complete Delete Logic
//     console.log('Deleting!');
//   }

//   updateBlogsState = (blog, index) => {
//     const {drafts, published} = this.state;

//     if (blog.status === 'draft') {
//       published.splice(index, 1);
//       drafts.push(blog);
//     } else {
//       drafts.splice(index, 1);
//       published.push(blog);
//     }

//     this.setState({published, drafts});
//   }

//   createStatus = (status) => {
//     return status === 'draft' ? {view: 'Publish Story', value: 'published'}
//                               : {view: 'Make a Draft', value: 'draft'};
//   }

//   createAdditionalOptions = (blog, index) => {
//     const blogState = this.createStatus(blog.status);

//     return [
//       {text: blogState.view, handlers: { onClick: () => this.changeBlogState(blog, blogState, index) } },
//       {text: 'Delete', handlers: { onClick: () => this.deleteBlog(blog._id) } }
//     ]
//   }

//   renderBlogs = (blogs) => (
//     <ul className="my-blogs-list">
//       {
//         blogs.map((blog, index) => (
//             <li className="my-blogs-list-item" key={index} onClick={this.toggle}>
//               <Link route={`/blogs/${blog._id}/edit`}>
//                 <a > {blog.title} </a>
//               </Link>
//               <PortButtonDropdown title={'>'} items={this.createAdditionalOptions(blog, index)} />
//             </li>
//           )
//         )
//       }
//     </ul>
//   )

//   render() {
//     const { published, drafts } = this.state;
//     debugger;

//     return (
//       <BaseLayout headerType={'landing'}>
//         <section className="my-blogs-page">

//           <header className="masthead" style={{"backgroundImage": "url('/static/images/home-bg.jpg')"}}>
//             <div className="overlay"></div>
//             <div className="container">
//               <div className="row">
//                 <div className="col-lg-8 col-md-10 mx-auto">
//                   <div className="site-heading">
//                     <h1>Your Stories</h1>
//                     <span className="subheading">Preview of what you wrote</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </header>

//           <div className="container">
//             <div className="row">
//               <div className="col-md-6">
//                 <h2 className="my-blogs-page-subtitle"> Published </h2>
//                 {this.renderBlogs(published)}
//               </div>
//               <div className="col-md-6">
//                 <h2 className="my-blogs-page-subtitle"> Drafts </h2>
//                   {this.renderBlogs(drafts)}
//               </div>
//             </div>
//           </div>
//         </section>
//       </BaseLayout>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user
//   }
// }

// export default connect(mapStateToProps)(MyBlogs);

import React from "react";
import BaseLayout from "../components/BaseLayout.js";
import { connect } from "react-redux";

import * as actions from "../actions";
import { Link } from "../routes";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import PortButtonDropdown from "../components/ButtonDropdown";
import withAuth from "../components/hoc/withAuth";

class MyBlogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      reload: false,
      openCofirmation: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    actions
      .getMyBlogs()
      .then((blogs) => {
        this.setState({ blogs });
      })
      .catch(() => {});
  }

  separateBlogs(blogs) {
    const published = [];
    const drafts = [];

    blogs.forEach((blog) => {
      blog.status === "draft" ? drafts.push(blog) : published.push(blog);
    });

    return { published, drafts };
  }

  changeBlogState = (blog, blogState) => {
    blog.status = blogState.value.toLowerCase();

    actions
      .updateBlog(blog)
      .then(() => {
        this.setState({ reload: true });
      })
      .catch((err) => console.error(err));
  };

  deleteBlog = (blog) => {
    if (blog.status === "published") {
      const res = window.confirm("Do you want delete published story?");

      if (res) {
        this.deleteBlogConfirm(blog);
      }
    } else {
      this.deleteBlogConfirm(blog);
    }
  };

  deleteBlogConfirm(blogToDelete) {
    actions
      .deleteBlog(blogToDelete._id)
      .then(() => {
        const { blogs } = this.state;
        const blogIndex = blogs.findIndex(
          (blog) => blog._id === blogToDelete._id
        );

        blogs.splice(blogIndex, 1);
        this.setState({ blogs });
      })
      .catch((err) => console.error(err));
  }

  createStatus = (status) => {
    return status === "draft"
      ? { view: "Publish Story", value: "published" }
      : { view: "Make a Draft", value: "draft" };
  };

  createAdditionalOptions = (blog, index) => {
    const blogState = this.createStatus(blog.status);

    return [
      {
        text: blogState.view,
        handlers: { onClick: () => this.changeBlogState(blog, blogState) },
      },
      { text: "Delete", handlers: { onClick: () => this.deleteBlog(blog) } },
    ];
  };

  renderBlogs = (blogs) => (
    <ul className="my-blogs-list">
      {blogs.map((blog, index) => (
        <li className="my-blogs-list-item" key={index} onClick={this.toggle}>
          <Link route={`/blogs/${blog._id}/edit`}>
            <a> {blog.title} </a>
          </Link>
          <PortButtonDropdown
            title={">"}
            items={this.createAdditionalOptions(blog, index)}
          />
        </li>
      ))}
    </ul>
  );

  render() {
    const { blogs } = this.state;
    const { published, drafts } = this.separateBlogs(blogs);

    return (
      <BaseLayout headerType={"landing"}>
        <section className="my-blogs-page">
          <header
            className="masthead"
            style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
          >
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="site-heading">
                    <h1>Your Stories</h1>
                    <span className="subheading">
                      Preview of what you wrote
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="container">
            <Link route={`/blogs/new`}>
              <a> Create a New Blog </a>
            </Link>
            <div className="row">
              <div className="col-md-6">
                <h2 className="my-blogs-page-subtitle"> Published </h2>
                {this.renderBlogs(published)}
              </div>
              <div className="col-md-6">
                <h2 className="my-blogs-page-subtitle"> Drafts </h2>
                {this.renderBlogs(drafts)}
              </div>
            </div>
          </div>
        </section>
      </BaseLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(withAuth(MyBlogs));
