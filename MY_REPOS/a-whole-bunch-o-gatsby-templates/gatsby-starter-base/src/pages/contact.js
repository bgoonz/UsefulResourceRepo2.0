import React from 'react';

import Article from '../components/Article';
import Bodytext from '../components/Article/Bodytext';
import Heading from '../components/Article/Heading';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const ContactPage = props => {
  const {
    location: { pathname },
  } = props;

  return (
    <Layout>
      <Article>
        <Heading title="Contact" />
        <Bodytext>
          <p>Send me an email.</p>
        </Bodytext>
      </Article>
      <Seo title="Contact" path={pathname} />
    </Layout>
  );
};

export default ContactPage;
