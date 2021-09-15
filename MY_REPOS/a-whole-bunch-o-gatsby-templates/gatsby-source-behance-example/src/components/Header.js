import React from 'react';
import PropTypes from 'prop-types';
import { FaMapMarker, FaUser, FaThumbsUp, FaEye } from 'react-icons/fa';
import css from './Header.module.css';

const Header = ({ user }) => (
  <div className={css.wrapper}>
    <div className={css.content}>
      <div className={css.avatar}>
        <img src={user.avatar} alt={user.names.displayName} />
      </div>
      <h1 className={css.name}>{user.names.displayName}</h1>
      <div className={css.location}>
        <FaMapMarker /> {user.place.location}
      </div>
      <div className={css.stats}>
        <a href={user.url} target="_blank" rel="noopener noreferrer">
          <span>
            <FaUser /> {user.stats.followers}
          </span>{' '}
          <span>
            <FaThumbsUp /> {user.stats.appreciations}
          </span>
          <span>
            <FaEye /> {user.stats.views}
          </span>
        </a>
      </div>
      <div className={css.socialMedia}>
        <ul>
          {user.socialMedia.map(social => (
            <li key={social.social_id}>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                {social.service_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Header;

Header.propTypes = {
  user: PropTypes.any.isRequired,
};
