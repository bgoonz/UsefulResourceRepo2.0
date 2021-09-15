import React from 'react';
import { Switch, NavLink, BrowserRouter, Route } from 'react-router-dom';

import Deck from './Deck';
import StoreContainer from './StoreContainer';

function App(props) {
	const { decks } = props;
	return (
		<React.Fragment>
			<h1 className='title is-1'>Star Trek Trading Card Store!</h1>
			<p>Here you can buy and sell cards in order to build your ultimate deck!</p>
			<BrowserRouter>
				<div className='navbar'>
					<div className='navbar-menu'>
						<NavLink to='/store' className='navbar-item' activeClassName='is-selected'>
							Store
						</NavLink>
						{props.decks.map((deck) => (
							<NavLink to={`/decks/${deck.id}`} className='navbar-item' activeClassName='is-selected' key={deck.id}>
								{deck.name}
							</NavLink>
						))}
					</div>
				</div>
				<Switch>
					<Route path='/decks/:id' render={(props) => <Deck deckId={props.match.params.id} decks={decks} />} />
					<Route exact path='/store' component={StoreContainer} />
				</Switch>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;
