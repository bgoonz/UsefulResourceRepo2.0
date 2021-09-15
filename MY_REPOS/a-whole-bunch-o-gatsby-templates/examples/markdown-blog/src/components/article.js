import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'gatsby';

import styles from './article.module.css';

const Article = ({ title, date, excerpt, slug }) => {
  const firstChar = title.charAt(0);

  return (
    <article className={styles.post}>
      <h2 className={styles.title}>
        <span className={styles.initiale}>{firstChar}</span>
        <Link to={slug}>{title}</Link>
      </h2>
      <h4 className={styles.date}>{date}</h4>
      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
};

export default Article;

Article.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}
