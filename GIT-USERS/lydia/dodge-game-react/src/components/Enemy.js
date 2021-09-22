import React, { Component, PropTypes } from 'react';
import Square from './Square';

class Enemy extends Component {
    componentDidUpdate() {
        const { size, playerPosition, info: { top, left }} = this.props;

        if ( playerPosition.left < (left + size) &&
             playerPosition.top  < (top + size)  &&
            (playerPosition.left + size) > left &&
            (playerPosition.top  + size) > top) {

            this.props.onCollide()
        }
    }

    render() {
        const { size, info: { top, left }, image } = this.props;

        return (
          <Square
            size={size}
            position={{ top, left }}
            image="https://rlv.zcache.com/denmark_flag_postcard-rab0fea5015a343c98da7a4a2eeefd3a7_vgbaq_8byvr_324.jpg"/>
        );
    }
}

Enemy.propTypes = {
    size: PropTypes.number.isRequired,
    info: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        dir: PropTypes.string.isRequired
    }),
    playerPosition: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }),
    onCollide: PropTypes.func.isRequired
};

export default Enemy;
