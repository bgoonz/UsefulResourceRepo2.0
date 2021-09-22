import React from "react";
import PropTypes from "prop-types";
// Components
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Tag from "../components/tag";
import styled from "styled-components";

const Heading = styled.h2`
  font-family: "Rubik";
  &:hover {
    text-decoration: underline;
  }
`;
const Post = styled.div`
  margin-bottom: 40px;
`;
const Small = styled.small`
  display: block;
  font-family: "Rubik";
  color: #5bc0de;
`;
const Excerpt = styled.p`
  font-family: "Rubik";
  display: inline-block;
  margin-bottom: 0;
`;

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { nodes, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  const getTags = (tags) => {
    const postTags = [];
    tags.forEach((tag, i) => {
      postTags.push(<Tag key={i} name={tag} />);
    });
    return postTags;
  };

  return (
    <Layout>
      <div>
        <i>
          <Heading>{tagHeader}</Heading>
        </i>
        {nodes.map((post) => {
          return (
            <Post key={post.id}>
              <Link
                to={post.fields.slug}
                style={{ textDecoration: `none`, color: `#073444` }}
              >
                <Heading>{post.frontmatter.title}</Heading>
              </Link>
              <Small>
                Posted on{" "}
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Small>
              <Excerpt>{post.excerpt}</Excerpt>
              <Link
                to={post.fields.slug}
                style={{
                  color: `#0275d8`,
                  fontFamily: `Rubik`,
                  textDecoration: `none`,
                  display: `block`,
                  marginBottom: `20px`,
                }}
              >
                <small className="inline"> Read full post</small>
              </Link>
              <small>{getTags(post.frontmatter.tags)}</small>
            </Post>
          );
        })}
      </div>
    </Layout>
  );
};

Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query ($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        excerpt(pruneLength: 200)
        body
        id
        frontmatter {
          title
          date
          tags
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default Tags;
