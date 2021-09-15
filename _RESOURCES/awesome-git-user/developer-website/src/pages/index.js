import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Seo from "../components/seo";
import github from "../images/icons/github.svg";
import linkedin from "../images/icons/linkedin.svg";
import email from "../images/icons/email.svg";
import youtube from "../images/icons/youtube.svg";
import so from "../images/icons/stackoverflow.svg";
import twitter from "../images/icons/twitter.svg";
import "./styles/index.css";

export default function Index({ data }) {
  const post = data.allMarkdownRemark.edges[0];

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

  return (
    <Layout>
      <Seo title="Home" />
      <div className="index">
        <div className="intro">
          <GatsbyImage
            className="profile-img"
            image={image}
            alt="Author profile pic"
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
        <div className="post">
          <h2 className="index-post-heading">
            <i>My latest blog post...</i>
          </h2>
          <h4 style={{ marginBottom: 0 }}>{post.node.frontmatter.title}</h4>
          <small>{post.node.frontmatter.date}</small>
          <p>{post.node.excerpt}</p>
          <Link to={post.node.fields.slug}>
            <button className="index-post-button">Read more</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    profilePic: file(relativePath: { eq: "willjw3_intro.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
    allMarkdownRemark(
      limit: 20
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          html
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            pagetype
            image {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
          fields {
            slug
          }
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;
