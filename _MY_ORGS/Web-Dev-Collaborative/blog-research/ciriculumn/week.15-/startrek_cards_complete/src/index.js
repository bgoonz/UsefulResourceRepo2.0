import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import configureStore from './store/store';
import AppContainer from './AppContainer';

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
