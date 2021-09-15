import { useStaticQuery, graphql } from 'gatsby';

const pageLinks = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          pageLinks {
            label
            to
          }
        }
      }
    }
  `);

  const {
    site: {
      siteMetadata: { pageLinks },
    },
  } = data;

  return pageLinks;
};

export default pageLinks;
