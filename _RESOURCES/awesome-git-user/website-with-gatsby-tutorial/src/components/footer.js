import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import "../styles/footer.scss";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query footerQuery {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `);
  return (
    <div className="footer">
      <hr />
      <p>
        &copy; {new Date().getFullYear()}, {data.site.siteMetadata.title}
      </p>
    </div>
  );
};

export default Footer;
