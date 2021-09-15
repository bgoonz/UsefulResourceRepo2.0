import React from 'react';

import Card from './Card';


const Deck = (props) => {
    const deck = props.decks.find((deck) => { return parseInt(deck.id, 10) === parseInt(props.deckId, 10) } )
    return (<div>
        <h2>{deck.name}</h2>
        {deck.cards.map((card) => <Card imgUrl={card.imgUrl} content={card.content} key={card.id} />)}
    </div>);

}

export default Deck;