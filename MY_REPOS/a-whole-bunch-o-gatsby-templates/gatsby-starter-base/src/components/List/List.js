import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import ListItem from './ListItem';

const List = props => {
  const { items } = props;

  return (
    <div class="list">
      <ul>
        {items.map(item => {
          const {
            frontmatter: { title },
            fields: { slug },
          } = item;

          return <ListItem key={slug} to={slug} title={title} />;
        })}
      </ul>
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
};

export default List;
