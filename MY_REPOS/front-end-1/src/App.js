import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers';

// import PrivateRoute from './utils/privateRoute';
import Nav from './components/Nav';
import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent';
import Signup from './components/Signup';
const store = createStore(rootReducer);

function App() {
  return (

    <Provider store={store}>
      <Router>
	<div className="App">
     	  <Switch>
	    <Route path='/add-event' component={AddEvent}/>
	    <Route path='/edit-event/:id' component={EditEvent}/>
            <Route path='Signup' component={Signup}/>    
            <Route path='/' component={Nav}/>    
     	  </Switch>
	</div>
      </Router>
    </Provider>
  );
}

export default App;

