import React from 'react';

import Store from './Store';
import STContext from './STContext';

const StoreWithContext = (props) => {

    return (
        <STContext.Consumer>
            {(value) => {
                return <Store inventory={value.inventory} cards={value.cards} />
            }}
        </STContext.Consumer>
        );
}
export default StoreWithContext;