import PropTypes from 'prop-types';
import React from 'react';

import Article from '../Article';
import Bodytext from '../Article/Bodytext';
import Heading from '../Article/Heading';

const Page = props => {
  const {
    page: {
      html,
      frontmatter: { title },
    },
  } = props;

  return (
    <Article className="page">
      <header>
        <Heading title={title} />
      </header>
      <Bodytext html={html} />
    </Article>
  );
};

Page.propTypes = {
  page: PropTypes.object.isRequired,
};

export default Page;
