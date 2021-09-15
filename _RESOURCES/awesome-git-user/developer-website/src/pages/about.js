import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Seo from "../components/seo";
import github from "../images/icons/github.svg";
import linkedin from "../images/icons/linkedin.svg";
import email from "../images/icons/email.svg";
import youtube from "../images/icons/youtube.svg";
import so from "../images/icons/stackoverflow.svg";
import twitter from "../images/icons/twitter.svg";
import react from "../images/icons/react.svg";
import javascript from "../images/icons/javascript.svg";
import html5 from "../images/icons/html5.svg";
import css3 from "../images/icons/css3.svg";
import graphQL from "../images/icons/graphql.svg";
import typescript from "../images/icons/typescript.svg";
import d3 from "../images/icons/d3-dot-js.svg";
import node from "../images/icons/node-dot-js.svg";
import postgres from "../images/icons/postgresql.svg";

import "./styles/about.css";

export default function About({ data }) {
  const about = data.info.edges[0];

  const image = getImage(data.profilePic);
  const socialIcons = [
    { tech: github, name: "GitHub", url: "https://github.com/willjw3" },
    {
      tech: so,
      name: "Stack Overflow",
      url: "https://stackoverflow.com/users/10262432/will-ward",
    },
    {
      tech: linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/will-ward-65234a170/",
    },
    { tech: twitter, name: "Twitter", url: "https://twitter.com/willjw3" },
    {
      tech: youtube,
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCroJckuB_ohjtZUewCv0Ukw",
    },
  ];
  const feIcons = [
    { tech: javascript, name: "JavaScript" },
    { tech: typescript, name: "TypeScript" },
    { tech: react, name: "React" },
    { tech: graphQL, name: "GraphQL" },
    { tech: html5, name: "HTML5" },
    { tech: css3, name: "CSS3" },
    { tech: d3, name: "D3.js" },
  ];
  const beIcons = [
    { tech: node, name: "Node.js" },
    { tech: typescript, name: "TypeScript" },
    { tech: graphQL, name: "GraphQL" },
    { tech: postgres, name: "PostgreSQL" },
  ];

  return (
    <Layout>
      <Seo title="About" />
      <div className="about">
        <div className="intro">
          <GatsbyImage
            className="profile-img"
            image={image}
            alt="Profile pic"
          />
          <h1 className="profile-name">Will Ward</h1>
          <h1 className="profile-description">
            Full Stack <br /> Web Developer
          </h1>
          <div className="social-icons">
            {socialIcons.map((icon, i) => {
              return (
                <a
                  key={i}
                  href={icon.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img width={24} key={i} src={icon.tech} alt={icon.name} />
                </a>
              );
            })}
            <a
              href="mailto:willjw3dev@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img width={24} src={email} alt="" />
            </a>
          </div>
        </div>
        <hr className="divider" />
        <div className="about-body">
          <h2 className="about-post-heading">
            <i>{about.node.frontmatter.description}</i>
          </h2>
          <div
            className="markdown-block"
            dangerouslySetInnerHTML={{ __html: about.node.html }}
          />
          <h2 className="about-post-heading">
            <i>The tech I work with frequently...</i>
          </h2>
          <h4 className="tech-heading">Front end</h4>
          <div className="full-stack-icons">
            {feIcons.map((icon, j) => {
              return (
                <div key={j}>
                  <img
                    className="full-stack-icon"
                    width={36}
                    src={icon.tech}
                    alt={icon.name}
                  />
                  <small>{icon.name}</small>
                </div>
              );
            })}
          </div>
          <h4 className="tech-heading">Back end</h4>
          <div className="full-stack-icons">
            {beIcons.map((icon, k) => {
              return (
                <div key={k}>
                  <img
                    className="full-stack-icon"
                    width={36}
                    src={icon.tech}
                    alt={icon.name}
                  />
                  <small>{icon.name}</small>
                </div>
              );
            })}
          </div>
        </div>
        <div className="contact">
          <h2 className="contact-title">Contact Me</h2>
          <form
            name="contact"
            method="post"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="form-style-9"
          >
            <input type="hidden" name="form-name" value="contact" />
            <ul>
              <li>
                <input
                  type="text"
                  name="field1"
                  className="field-style field-split align-left"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="field2"
                  className="field-style field-split align-right"
                  placeholder="Email"
                />
              </li>
              <li>
                <input
                  type="text"
                  name="field3"
                  className="field-style field-split align-left"
                  placeholder="Phone"
                />
                <input
                  type="url"
                  name="field4"
                  className="field-style field-split align-right"
                  placeholder="Website"
                />
              </li>
              <li>
                <input
                  type="text"
                  name="field3"
                  className="field-style field-full align-none"
                  placeholder="Subject"
                />
              </li>
              <li>
                <textarea
                  name="field5"
                  className="field-style"
                  placeholder="Message"
                ></textarea>
              </li>
              <li>
                <button type="submit">Submit</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query aboutQuery {
    profilePic: file(relativePath: { eq: "willjw3_intro.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
    info: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/info/" } }
    ) {
      totalCount
      edges {
        node {
          html
          frontmatter {
            title
            description
            pagetype
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
