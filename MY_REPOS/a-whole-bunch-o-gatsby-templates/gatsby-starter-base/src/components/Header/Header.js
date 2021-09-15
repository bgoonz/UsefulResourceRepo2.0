import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Branding from './Branding';
import Menu from '../Menu';

const Header = props => {
  const { title, subTitle = '', menu } = props;

  return (
    <header className="header">
      <Branding title={title} subTitle={subTitle} />
      {menu && <Menu items={menu} />}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  menu: PropTypes.array,
};

export default Header;
