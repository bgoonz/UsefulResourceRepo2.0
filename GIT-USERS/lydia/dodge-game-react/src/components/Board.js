//Dependencies
import React from 'react';

const style = (dimension) => {
  return {
    width: '400px',
    height: '400px',
    border: '1px solid black',
    position: 'relative',
    margin: '25px auto',
    overflow: 'hidden',
    backgroundColor: 'green'
  };
};

export default ({ dimension, children }) => (
  <div style={style(dimension)}>
    {children}
  </div>
)
