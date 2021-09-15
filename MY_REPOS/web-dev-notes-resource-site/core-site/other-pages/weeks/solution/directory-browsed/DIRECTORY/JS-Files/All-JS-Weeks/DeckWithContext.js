import React from 'react';

import Deck from './Deck';
import STContext from './STContext';

const DeckWithContext = (props) => {

    return (
        <STContext.Consumer>
            {(value) => {
                return <Deck deckId={props.deckId} decks={value.decks} />
            }}
        </STContext.Consumer>
        )

}

export default DeckWithContext;