gimport React from 'react';
import PropTypes from 'prop-types';
import {useColorMode} from '@xstyled/emotion';

import {
  IconAzobu,
  IconTwitter,
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconGitHub,
  IconYouTube,
} from '../../components/icons';

import theme from '../../data/theme.json';

const SocialIcon = ({title}) => {
  const [colorMode] = useColorMode ();

  switch (title.toLowerCase ()) {
    case 'azobu':
      return <IconAzobu colorMode={colorMode} />;
    case 'twitter':
      return <IconTwitter />;
    case 'facebook':
      return <IconFacebook colorMode={colorMode} />;
    case 'instagram':
      return <IconInstagram />;
    case 'linkedin':
      return <IconLinkedIn colorMode={colorMode} theme={theme} />;
    case 'github':
      return <IconGitHub colorMode={colorMode} />;
    case 'youtube':
      return <IconYouTube colorMode={colorMode} theme={theme} />;
    default:
      return <IconAzobu />;
  }
};

SocialIcon.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SocialIcon;
