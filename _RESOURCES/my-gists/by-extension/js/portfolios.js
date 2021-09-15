import React from "react";
import axios from "axios";
import Link from "next/link";
import BaseLayout from "../components/layouts/BaseLayout";

class Portfolios extends React.Component {
  state = {
    row: "",
    item: "20",
    rows: [
      {
        row1: "1",
      },
      {
        row1: "5",
      },
      {
        row1: "10",
      },
    ],
  };
  static async getInitialProps() {
    let posts = [];
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      ); //('https://jsonplaceholder.typicode.com/posts');
      posts = response.data;
    } catch (err) {
      console.error(err);
    }
    return { posts };
  }

  renderPosts(posts) {
    const { item } = this.state;
    return posts.splice(0, item).map((post) => {
      return (
        <li>
          <Link
            as={`/portfolio/${post.id}`}
            href={`/portfolio?title=${post.title}`}
          >
            <a style={{ fontSize: "20px" }}>{post.title}</a>
          </Link>
        </li>
      );
    });
  }
  onProductChange = (event) => {
    const item = event.target.value;
    let posts = [];

    this.setState({
      item: item,
    });
  };
  render() {
    const uniqueItems = this.state.rows.map((item) => item.row1);
    const { posts } = this.props;

    return (
      <BaseLayout>
        <select className="form-control" onChange={this.onProductChange}>
          <option value="">Select one...</option>
          {uniqueItems.map((row) => (
            <option key={row} value={row}>
              {row}
            </option>
          ))}
        </select>

        <body>
          {" "}
          <h1>
            <b>Yea!!!,Happy to be inside Portfolios</b>
          </h1>
        </body>
        <div>
          <a href="/about">About </a>
        </div>
        <ul>{this.renderPosts(posts)}</ul>
      </BaseLayout>
    );
  }
}

export default Portfolios;
