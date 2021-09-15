import React from "react";
import Navbar from "ashishdotme-ui/components/navbar";
import Footer from "ashishdotme-ui/components/footer";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "../styles/index.sass";

const Main = ({ data }) => {
  return (
    <>
      <Navbar />
      <section className="hero m-b-xl m-t-lg" id="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="is-spaced title is-1">Minimal Todoist</h1>
            <h2 className="subtitle is-3 m-t-lg">
              An extension to help you complete todoist tasks
            </h2>
            <div className="content hero-platform is-hidden-touch">
              <div className="content item">
                <a
                  href="https://chrome.google.com/webstore/detail/minimal-todoist/eofnkjgkfjlalkapnfklldgdaghkilce"
                  download=""
                  className="is-primary is-large is-rounded button"
                >
                  <strong>Download for Chrome</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section screenshot">
        <div className="image gatsby-image-wrapper">
          <Img fluid={data.file.childImageSharp.fluid} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export const ImageQuery = graphql`
  query {
    file(relativePath: { eq: "minimal-todoist-extension.png" }) {
      childImageSharp {
        fluid(maxWidth: 1472) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Main;
