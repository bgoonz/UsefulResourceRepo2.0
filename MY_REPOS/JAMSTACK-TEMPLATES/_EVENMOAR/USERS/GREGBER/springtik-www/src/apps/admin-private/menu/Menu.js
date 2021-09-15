import React from 'react';
import Link from 'react-router/lib/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './menu.scss';

export const Menu = () => (
  <nav className={styles.menu}>
    <ul>
      <li>
        <Link to="/categories" activeClassName={styles.active}>Catégories</Link>
        <Link to="/activities" activeClassName={styles.active}>Activités</Link>
      </li>
    </ul>
  </nav>
);

export default withStyles(styles)(Menu);
