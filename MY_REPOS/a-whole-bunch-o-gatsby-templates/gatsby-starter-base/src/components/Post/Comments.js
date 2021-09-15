import React from 'react';
import PropTypes from 'prop-types';
import FacebookProvider, { Comments as FBComments } from 'react-facebook';

const Comments = props => {
  const { slug, siteUrl } = props;

  return (
    <div className="comments">
      <FacebookProvider appId={process.env.GATSBY_FACEBOOK_APPID}>
        <FBComments
          href={`${siteUrl}${slug}`}
          width="100%"
          colorScheme="light"
        />
      </FacebookProvider>
    </div>
  );
};

Comments.propTypes = {
  slug: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
};

export default Comments;
