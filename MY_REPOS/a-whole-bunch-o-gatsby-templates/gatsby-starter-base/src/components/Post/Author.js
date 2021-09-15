import React from 'react';
import PropTypes from 'prop-types';

const Author = props => {
  const { note } = props;

  return (
    <div className="author">
      <div className="note" dangerouslySetInnerHTML={{ __html: note }} />
    </div>
  );
};

Author.propTypes = {
  note: PropTypes.string.isRequired,
};

export default Author;
