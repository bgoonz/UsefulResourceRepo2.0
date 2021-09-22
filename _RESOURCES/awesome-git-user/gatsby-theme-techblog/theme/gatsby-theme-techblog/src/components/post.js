import React from "react";
import styled from "styled-components";
import Tag from "./tag";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Postwrap = styled.div`
  font-family: "Rubik";
`;

const Title = styled.h2`
  font-family: "Rubik";
`;
const Postdate = styled.p`
  margin-top: 20px;
  margin-bottom: 0;
`;

const Post = (props) => {
  console.log(props);
  const getTags = (tags) => {
    const postTags = [];
    tags.forEach((tag, i) => {
      postTags.push(<Tag key={i} name={tag} />);
    });
    return postTags;
  };
  return (
    <Postwrap>
      <Title>{props.frontmatter.title}</Title>
      <small>{getTags(props.frontmatter.tags)}</small>
      <Postdate>
        <small>
          Published on{" "}
          {new Date(props.frontmatter.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </small>
      </Postdate>
      <hr />
      <MDXRenderer>{props.body}</MDXRenderer>
    </Postwrap>
  );
};

export default Post;
