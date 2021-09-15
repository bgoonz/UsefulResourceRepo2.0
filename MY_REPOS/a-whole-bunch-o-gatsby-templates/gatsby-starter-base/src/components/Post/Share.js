import React from 'react';
import PropTypes from 'prop-types';
import { ShareButton, ShareBlock } from 'react-custom-share';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaGooglePlus from 'react-icons/lib/fa/google-plus';
import FaLinkedin from 'react-icons/lib/fa/linkedin';

import config from '../../../content/meta/config';

const PostShare = props => {
  const {
    post: {
      fields: { slug },
      frontmatter: { title },
      excerpt,
    },
  } = props;

  const url = config.siteUrl + slug;

  const shareBlockProps = {
    url: url,
    button: ShareButton,
    buttons: [
      { network: 'Twitter', icon: FaTwitter },
      { network: 'Facebook', icon: FaFacebook },
      { network: 'GooglePlus', icon: FaGooglePlus },
      { network: 'Linkedin', icon: FaLinkedin },
    ],
    text: title,
    longtext: excerpt,
  };

  return (
    <div className="share">
      <ShareBlock {...shareBlockProps} />
    </div>
  );
};

PostShare.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostShare;
