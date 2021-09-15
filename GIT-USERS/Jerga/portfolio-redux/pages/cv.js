import React from "react";
import BaseLayout from "../components/BaseLayout.js";
import { Document, Page } from "react-pdf";

import * as actions from "../actions";

class Cv extends React.Component {
  static async getInitialProps({ req }) {
    // const res = await fetch('http://localhost:3000/api/v1/portfolios');
    // const data = await res.json();
    try {
      const data = await actions.getCv(req);

      return { cv: data };
    } catch (err) {
      return { err };
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
    };
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { cv } = this.props;
    const { pageNumber, numPages } = this.state;

    return (
      <BaseLayout>
        <section className="contactPage">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="cv-title">
                  <h1
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      visibility: "hidden",
                    }}
                  >
                    {" "}
                    GET MY CV{" "}
                  </h1>
                  <a
                    download="jerga_cv.pdf"
                    class="btn btn-success"
                    href="/static/jerga_cv.pdf"
                  >
                    Download
                  </a>
                </div>

                <div>
                  <iframe
                    src="/static/jerga_cv.pdf"
                    style={{ width: "100%", height: "700px" }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BaseLayout>
    );
  }
}

export default Cv;
