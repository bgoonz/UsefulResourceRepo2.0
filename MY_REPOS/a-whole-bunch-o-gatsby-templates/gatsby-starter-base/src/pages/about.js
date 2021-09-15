import React from 'react';

import Article from '../components/Article';
import Bodytext from '../components/Article/Bodytext';
import Heading from '../components/Article/Heading';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const AboutPage = props => {
  const {
    location: { pathname },
  } = props;

  return (
    <Layout>
      <Article>
        <Heading>
          <h1>About</h1>
        </Heading>
        <Bodytext>
          <p>Well, how to start...</p>
        </Bodytext>
      </Article>
      <Seo title="Contact" path={pathname} />
    </Layout>
  );
};

export default AboutPage;
