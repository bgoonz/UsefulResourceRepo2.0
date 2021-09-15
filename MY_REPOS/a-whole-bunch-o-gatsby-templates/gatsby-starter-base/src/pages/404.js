import React from 'react';

import Article from '../components/Article';
import Bodytext from '../components/Article/Bodytext';
import Heading from '../components/Article/Heading';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const NotFoundPage = props => {
  return (
    <Layout>
      <Article>
        <Heading title="NOT FOUND" />
        <Bodytext>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Bodytext>
      </Article>
      <Seo />
    </Layout>
  );
};

export default NotFoundPage;
