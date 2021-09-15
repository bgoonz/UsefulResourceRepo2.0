/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

const Hero = () => (
  <section className="hero is-default is-bold">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-5 is-offset-1 landing-caption">
            <h1 className="title is-1 is-bold is-spaced">
              Learn, Collaborate.
            </h1>
            <h2 className="subtitle is-5 is-muted">
              Lorem ipsum sit dolor amet is a dummy text used by typography
              industry{" "}
            </h2>
            <p>
              <a className="button cta rounded primary-btn raised">
                Get Started
              </a>
            </p>
          </div>
          <div className="column is-5 is-offset-1">
            <figure className="image is-4by3">
              <img
                src={process.env.PUBLIC_URL + "/worker.svg"}
                alt="Description"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
