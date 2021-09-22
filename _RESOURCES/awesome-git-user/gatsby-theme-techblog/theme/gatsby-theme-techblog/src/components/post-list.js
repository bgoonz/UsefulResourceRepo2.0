import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Tag from "./tag";

const Post = styled.div`
  margin-bottom: 40px;
`;
const Heading = styled.h2`
  font-family: "Rubik";
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

const PostList = ({ posts }) => {
  const getTags = (tags) => {
    const postTags = [];
    tags.forEach((tag, i) => {
      postTags.push(<Tag key={i} name={tag} />);
    });
    return postTags;
  };
  return (
    <div>
      <i>
        <Heading>The Latest</Heading>
      </i>
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
    </div>
  );
};

export default PostList;
