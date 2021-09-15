import React from 'react';
import PropTypes from 'prop-types';
import styled from '@xstyled/emotion';

const InputStyled = styled.input``;

const Input = props => {
  return <InputStyled {...props} />;
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  ref: PropTypes.any,
  placeholder: PropTypes.string,
};

export default Input;
