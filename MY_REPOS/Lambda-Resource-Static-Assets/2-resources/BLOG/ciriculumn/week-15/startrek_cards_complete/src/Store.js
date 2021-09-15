import React from 'react';

import Card from './Card';

const Store = (props) => {
	return (
		<React.Fragment>
			<h2>Store</h2>
			<div className='columns'>
				{props.cards.map((card) => (
					<div key={card.id} className='column is-one-sixth'>
						<button className='button' onClick={(e) => props.purchaseCard(card)}>
							<small>Buy ({props.inventory[card.id]})</small>
						</button>
						<Card {...card} />
					</div>
				))}
			</div>
		</React.Fragment>
	);
};

export default Store;
