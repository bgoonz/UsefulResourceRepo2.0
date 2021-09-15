import PropTypes from 'prop-types';
import React from 'react';

const Footer = props => {
  const {
    footnote: { html = '' },
    copyrightNote = 'Copyright 2018, all rights reserved',
  } = props;

  return (
    <footer className="footer">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div>{copyrightNote}</div>
    </footer>
  );
};

Footer.propTypes = {
  footnote: PropTypes.shape({
    html: PropTypes.string,
  }),
  copyrightNote: PropTypes.string,
};

export default Footer;
