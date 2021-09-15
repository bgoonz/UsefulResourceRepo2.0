import React from 'react';
import { render } from 'react-dom';

// Helper.
const callUseEffect = () => {
  const Noop = () => null;
  const root = document.createElement('div');
  render(<Noop />, root);
};

// Export.
export { callUseEffect };
