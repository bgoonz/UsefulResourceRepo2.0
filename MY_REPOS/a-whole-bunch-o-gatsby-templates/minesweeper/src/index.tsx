import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Bug from './icons/bug';
import Github from './icons/github';
import MineSweeperContainer from './mine-sweeper-container';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <React.Fragment>
    <a href="https://github.com/Knochenmark/minesweeper/issues" title="Report a bug" className="bug">
      <Bug />
    </a>
    <div className="github-container">
      <a href="https://github.com/Knochenmark" title="Find me on Github" className="github">
        <Github />
        Knochenmark
      </a>
      <a href="https://github.com/Psyperl" title="Find me on Github" className="github">
        <Github />
        Psyperl
      </a>
    </div>
    <MineSweeperContainer />
  </React.Fragment>,
  document.getElementById('root') as HTMLElement
);

document.oncontextmenu = () => false;
registerServiceWorker();
