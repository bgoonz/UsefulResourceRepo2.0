import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function Footer() {
  const data = useStaticQuery(graphql`
    query footerQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);
  const author = data.site.siteMetadata.author;
  return (
    <div className="footer">
      <p>
        &copy; {new Date().getFullYear()},{" "}
        <a
          href="https://github.com/willjw3"
          target="_blank"
          rel="noreferrer noopener"
        >
          {author}
        </a>
      </p>
    </div>
  );
}
