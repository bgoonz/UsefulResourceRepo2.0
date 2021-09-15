import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Pomodoro from './Pomodoro';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pomodoro />, div);
  ReactDOM.unmountComponentAtNode(div);
});
