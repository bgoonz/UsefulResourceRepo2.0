import React from "react";
import Link from "next/link";
import Layout from "../components/layouts/Layout.jsx";

const HowItWorks = () => (
  <Layout>
    <div className="container main">
      <div className="jumbotron text-center">
        <h1>How It Works</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="row info-row justify-content-center">
              <div>
                <h1>Step 1</h1>
              </div>
              <div className="text-center">
                <p>
                  Firstly, your going to need an account. Head over to the sign
                  up page and create one now.
                </p>
                <Link href="/signup">
                  <button type="button" className="btn btn-primary">
                    {"Sign up"}
                  </button>
                </Link>
              </div>
            </div>
            <div className="row info-row">
              <div className="image image2" />
            </div>
            <div className="row info-row justify-content-center">
              <div>
                <h1>Step 3</h1>
              </div>
              <div className="text-center">
                <p>
                  Search for opportunities to volunteer by location.
                  Opportunities that show up will be matched to the skills in
                  your profile.
                </p>
              </div>
            </div>
            <div className="row info-row">
              <div className="image image4" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="row info-row">
              <div className="image image1" />
            </div>
            <div className="row info-row justify-content-center">
              <div>
                <h1>Step 2</h1>
              </div>
              <div className="text-center">
                <p>
                  Fill out your profile. It is important you do this, especially
                  the skills section, as volunteering opportunities will be
                  matched to your skills.
                </p>
              </div>
            </div>
            <div className="row info-row">
              <div className="image image3" />
            </div>
            <div className="row info-row justify-content-center">
              <div>
                <h1>Step 4</h1>
              </div>
              <div className="text-center">
                <p>
                  Contact the charities with relevant opportunities and start to
                  contribute!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>{`
            .info-row { 
                height: 250px; 
                padding: 5px; 
                font-size: 20pt;
            }
            .image {
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                position: relative;
                justify-content: center;
                width: 100%;
            }
            .image1 { 
                background-image: url(../static/sign-up.jpg); 
            }
            .image2 {
                background-image: url(../static/tick-box.jpg); 
            }
            .image3 {
                background-image: url(../static/search.jpg); 
            }
            .image4 {
                background-image: url(../static/contact.jpg); 
            }

        .main { margin-top: 56px; }
        `}</style>
  </Layout>
);

export default HowItWorks;
