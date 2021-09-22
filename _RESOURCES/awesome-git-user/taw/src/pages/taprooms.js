import React from "react";
import { Link, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSquare,
  faInfoCircle,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout";
import Footer from "../components/footer";
import Img from "gatsby-image";
import "../styles/taprooms.scss";

const Taprooms = ({ data }) => {
  return (
    <Layout>
      <div className="taprooms">
        <div className="taprooms-main">
          <h1 className="taprooms-main-title">OUR TAPROOMS</h1>
          <div className="taprooms-main-body">
            <div className="taprooms-main-body-card">
              <div className="taprooms-main-body-card-image">
                <Img
                  style={{
                    width: "100%",
                    maxWidth: "80vw",
                    overflow: "visible",
                  }}
                  fluid={data.file.childImageSharp.fluid}
                  alt="Itabashi Taproom"
                />
              </div>
              <h2 className="taprooms-main-body-card-title">
                ITABASHI TAPROOM (板橋店)
              </h2>
              <div className="taprooms-main-body-card-links">
                <Link to="/itabashi-taproom">
                  <button>
                    <FontAwesomeIcon icon={faInfoCircle} size="2x" />
                    <span>店舗情報</span>
                  </button>
                </Link>
                <a href="">
                  <button>
                    <FontAwesomeIcon icon={faPhoneSquare} size="2x" />
                    <span>03-3961-1196</span>
                  </button>
                </a>
                <a
                  href="https://goo.gl/maps/4Uzo1R5V1f1MNndD9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <FontAwesomeIcon icon={faCompass} size="2x" />
                    <span>マップ</span>
                  </button>
                </a>
              </div>
            </div>
            <div className="taprooms-main-body-card">
              <div className="taprooms-main-body-card-image">
                <Img
                  style={{
                    width: "100%",
                    maxWidth: "80vw",
                    overflow: "visible",
                  }}
                  fluid={data.file.childImageSharp.fluid}
                  alt="Itabashi Taproom"
                />
              </div>
              <h2 className="taprooms-main-body-card-title">
                YURAKUCHO TAPROOM (有楽町店)
              </h2>
              <div className="taprooms-main-body-card-links">
                <Link to="/yurakucho-taproom">
                  <button>
                    <FontAwesomeIcon icon={faInfoCircle} size="2x" />
                    <span>店舗情報</span>
                  </button>
                </Link>
                <a href="">
                  <button>
                    <FontAwesomeIcon icon={faPhoneSquare} size="2x" />
                    <span>03-3961-1196</span>
                  </button>
                </a>
                <a
                  href="https://goo.gl/maps/4Uzo1R5V1f1MNndD9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <FontAwesomeIcon icon={faCompass} size="2x" />
                    <span>マップ</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Taprooms;

export const pageQuery = graphql`
  query taproomsQuery {
    file(relativePath: { eq: "itabashi_taproom_strip.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`;
