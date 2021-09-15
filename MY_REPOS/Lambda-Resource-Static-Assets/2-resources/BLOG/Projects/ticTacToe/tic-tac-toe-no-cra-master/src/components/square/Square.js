import React from 'react';
import PropTypes from 'prop-types';
import styles from './square.scss';

export function Square(props) {
    return (
        <button className={styles.square} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
Square.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}