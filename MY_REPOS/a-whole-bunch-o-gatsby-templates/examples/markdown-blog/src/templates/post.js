import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout'
import styles from './post.module.css';
import SEO from '../components/seo';

const Post = props => {
  const postNode = props.data.markdownRemark;
  const post = postNode.frontmatter;

  return (
    <Layout>
      <SEO title={`${post.title}`} />
      <article className={styles.blogPost}>
        <Link to="/">
          Gatsby Starter - Minimal Blog | Get back to the overview
        </Link>
        <h1 className={styles.title}>{post.title}</h1>
        <h4 className={styles.date}>{post.date}</h4>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: postNode.html }}
        />
      </article>
    </Layout>
  );
};

export default Post;

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
      }
    }
  }
`;
