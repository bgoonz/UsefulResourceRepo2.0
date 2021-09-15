import React from 'react';

import Article from '../components/Article';
import Bodytext from '../components/Article/Bodytext';
import Heading from '../components/Article/Heading';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const IndexPage = props => {
  return (
    <Layout>
      <Article>
        <Heading title="Hello world!" />
        <Bodytext>
          <p>That's a home page content</p>
        </Bodytext>
      </Article>
      <Seo />
    </Layout>
  );
};

export default IndexPage;
