import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MineSweeper from './mine-sweeper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MineSweeper rows={6} columns={6} mines={6} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
