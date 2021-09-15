import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import GithubIcon from 'react-feather/dist/icons/github';
import TwitterIcon from 'react-feather/dist/icons/twitter';
import MailIcon from 'react-feather/dist/icons/mail';

import style from '../styles/social';

const Social = () => (
  <StaticQuery
    query={graphql`
      query SocialQuery {
        site {
          siteMetadata {
            socialLinks {
              github
              twitter
              mailto
            }
          }
        }
      }
    `}
    render={data => {
      const {
        site: {
          siteMetadata: {
            socialLinks: { github, twitter, mailto },
          },
        },
      } = data;

      return (
        <div css={style}>
          <a href={github}>
            <GithubIcon />
          </a>
          <a href={twitter}>
            <TwitterIcon />
          </a>
          <a href={mailto}>
            <MailIcon />
          </a>
        </div>
      );
    }}
  />
);

export default Social;
