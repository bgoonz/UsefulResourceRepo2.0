import PropTypes from 'prop-types';
import React from 'react';

import style from '../styles/screen';

const Credist = () => (
  <div className="credits">
    Built with {` `}
    <a
      href="https://github.com/greglobinski/gatsby-themes/tree/master/packages/gatsby-theme-elevator-pitch"
      target="_blank"
      rel="noopener noreferrer"
    >
      Elevator Pitch
    </a>{' '}
    a <a href="https://gatsbyjs.org">Gatsby.js</a> theme.
  </div>
);

class Screen extends React.Component {
  screen = React.createRef();

  render() {
    const { id, children, transitionClass, avatar } = this.props;

    const dynamicStyle = style(this.props);

    return (
      <section
        css={dynamicStyle}
        className={`${transitionClass ? transitionClass : ''} ${
          avatar ? 'last' : ''
        }`}
        id={`id-${id}`}
        ref={this.screen}
      >
        {avatar && (
          <div className="avatar">
            <img src={avatar.src} alt="" />
          </div>
        )}
        <svg
          className="mask"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="2600px"
          height="3000px"
          viewBox="0 0 2600 3000"
        >
          <path
            stroke="none"
            d="M2600,3000H0V0h2600V3000z M1300,1370c-35.898,0-65,29.102-65,65s29.102,65,65,65s65-29.102,65-65
	S1335.898,1370,1300,1370z"
          />
        </svg>
        <div className="content">
          {children}
          {avatar && <Credist />}
        </div>
      </section>
    );
  }
}

Screen.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  transitionClass: PropTypes.string,
  superSizeScale: PropTypes.number.isRequired,
  exposedScreenId: PropTypes.number.isRequired,
  avatar: PropTypes.object,
  socialLinks: PropTypes.array,
};

export default Screen;
