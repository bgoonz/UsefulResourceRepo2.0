import React from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import FeaturedBlog from "../components/FeaturedBlog";
import BlogListing from "../components/BlogListing";
import SearchContainer from "../components/SearchContainer";
import Seo from "../components/Seo";

export default function IndexPage({ data, pageContext }) {
  const { nodes } = data.allMarkdownRemark;
  return (
    <Layout>
      <Seo
        title="Home"
        description="Code space is aiming to be the best platform to learn programming"
      />
      <div className="columns">
        {nodes.slice(0, 2).map((node) => (
          <div key={node.id} className="column">
            <FeaturedBlog blog={node} />
          </div>
        ))}
      </div>
      <div className="p-4">
        <BlogListing
          blogs={nodes}
          search={() => (
            <SearchContainer searchIndex={pageContext.searchIndex} />
          )}
        />
        <Link className="button is-primary is-small is-outlined" to="/blogs">
          Read more blogs...
        </Link>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          slug
          subtitle
          author
        }
      }
    }
  }
`;
