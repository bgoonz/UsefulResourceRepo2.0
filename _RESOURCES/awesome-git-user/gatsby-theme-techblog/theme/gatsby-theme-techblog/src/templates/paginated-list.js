import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Tag from "../components/tag";
import styled from "styled-components";

const Post = styled.div`
  margin-bottom: 40px;
`;
const Title = styled.h2`
  font-family: "Rubik";
  &:hover {
    text-decoration: underline;
  }
`;
const Excerpt = styled.p`
  font-family: "Rubik";
  margin-bottom: 0;
`;
const Small = styled.small`
  font-family: "Rubik";
  color: #5bc0de;
`;
const Pageleft = styled.span`
  font-family: "Rubik";
  color: navy;
`;
const Pageright = styled.span`
  font-family: "Rubik";
  color: navy;
  float: right;
`;

const PaginatedList = ({ pageContext, data }) => {
  const posts = data.allMdx.nodes;
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : "blog/" + (currentPage - 1).toString();
  const nextPage = "blog/" + (currentPage + 1).toString();

  const getTags = (tags) => {
    const postTags = [];
    tags.forEach((tag, i) => {
      postTags.push(<Tag key={i} name={tag} />);
    });
    return postTags;
  };
  return (
    <Layout>
      {posts.map((post) => {
        return (
          <Post key={post.id}>
            <Link
              to={post.fields.slug}
              style={{ textDecoration: `none`, color: `navy` }}
            >
              <Title>{post.frontmatter.title}</Title>
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
              <small> Read full post</small>
            </Link>
            <small>{getTags(post.frontmatter.tags)}</small>
          </Post>
        );
      })}
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev" style={{ textDecoration: `none` }}>
            <Pageleft>← Previous Page</Pageleft>
          </Link>
        )}
        {!isLast && (
          <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
            <Pageright>Next Page →</Pageright>
          </Link>
        )}
      </div>
    </Layout>
  );
};

export const listQuery = graphql`
  query paginateQuery($skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      totalCount
      nodes {
        excerpt(pruneLength: 200)
        frontmatter {
          title
          tags
          date
        }
        body
        id
        fields {
          slug
        }
      }
    }
  }
`;

export default PaginatedList;
