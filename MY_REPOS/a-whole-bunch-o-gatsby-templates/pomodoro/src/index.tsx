import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Bug from './icons/Bug';
import Github from './icons/Github';
import { bugStyle, githubStyle } from './indexStyles';
import Pomodoro from './Pomodoro';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <React.Fragment>
    <Pomodoro />
    <a href="https://github.com/Knochenmark/pomodoro/issues" title="Report a bug" className={bugStyle}>
      <Bug />
    </a>
    <a href="https://github.com/Knochenmark" title="Find me on Github" className={githubStyle}>
      <Github />
    </a>
  </React.Fragment>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
