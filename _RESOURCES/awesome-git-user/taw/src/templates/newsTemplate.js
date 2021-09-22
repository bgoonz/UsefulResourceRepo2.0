import React from "react";
import Layout from "../components/layout";
import Footer from "../components/footer";
import Img from "gatsby-image";
import "../styles/news.scss";

const News = ({ data }) => {
  const news = data.markdownRemark;

  return (
    <Layout>
      <div className="news">
        <div className="news-main">
          <div className="news-main-body">
            <div className="news-main-body-image">
              <Img
                style={{ width: "100%" }}
                fluid={news.frontmatter.image.childImageSharp.fluid}
              />
            </div>

            <div className="news-main-body-text">
              <h1>{news.frontmatter.title}</h1>
              <small>{news.frontmatter.date}</small>
              <hr />
              <div
                className="news-main-body-text-content"
                dangerouslySetInnerHTML={{ __html: news.html }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default News;

export const pageQuery = graphql`
  query newsQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
