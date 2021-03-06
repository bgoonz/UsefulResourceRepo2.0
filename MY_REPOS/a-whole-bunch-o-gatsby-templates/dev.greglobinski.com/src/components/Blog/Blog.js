import PropTypes from "prop-types";
import React from "react";

import Item from "./Item";

const Blog = (props) => {
  const { posts, theme } = props;

  function getRepo(identifier) {
    const { repos } = props;
    const repo = repos.find((item) => item.node.name === identifier);

    return repo ? repo.node : undefined;
  }

  return (
    <React.Fragment>
      <main className="main">
        <ul>
          {posts.map((post) => {
            const {
              node,
              node: {
                fields: { slug, identifier },
              },
            } = post;
            return <Item key={slug} post={node} theme={theme} repo={getRepo(identifier)} />;
          })}
        </ul>
      </main>

      {/* --- STYLES --- */}
      <style jsx>{`
        .main {
          padding: 0 ${theme.space.inset.default};
        }

        ul {
          list-style: none;
          margin: 0 auto;
          padding: ${`calc(${theme.space.default} * 1.5) 0 calc(${theme.space.default} * 0.5)`};
        }

        @above tablet {
          .main {
            padding: 0 ${`0 calc(${theme.space.default} * 1.5)`};
          }
          ul {
            max-width: ${theme.text.maxWidth.tablet};
          }
        }
        @above desktop {
          ul {
            max-width: ${theme.text.maxWidth.desktop};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  repos: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Blog;
