import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Seo from "../components/Seo";

export default function About({ data }) {
  return (
    <Layout>
      <Seo
        title="About"
        description="Learn more about Code space methodology"
      />
      <h1>{process.env.BASE_URL}</h1>
      <h1>{data.site.siteMetadata.title}</h1>
      <h1>{data.site.siteMetadata.body.content}</h1>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        body {
          content
        }
      }
    }
  }
`;
