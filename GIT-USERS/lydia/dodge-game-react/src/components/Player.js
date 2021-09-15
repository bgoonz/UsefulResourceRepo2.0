import React, { Component, PropTypes } from 'react';
import Square from './Square';
import { UP, DOWN, LEFT, RIGHT } from '../helpers/constants'

class Player extends Component {
    handleKeyDown = (e) => {
        let newDirection;

        switch(e.keyCode) {
            case 37:
                newDirection = { top: 0, left: -1 , dir: LEFT};
                break;
            case 38:
                newDirection = { top: -1, left: 0 , dir: UP};
                break;
            case 39:
                newDirection = { top: 0, left: 1, dir: RIGHT};
                break;
            case 40:
                newDirection = { top: 1, left: 0, dir: DOWN };
                break;
            default:
                return;
        }

        this.props.handlePlayerMovement(newDirection);
    }

    render() {
        const { size, position: { top, left }, image} = this.props;

        return (
            <div ref={ n => { this.player = n }} >
                <Square
                  size={size}
                  position={{ top, left }}
                  image= "https://www.united-states-flag.com/media/catalog/product/cache/2/small_image/374x/9df78eab33525d08d6e5fb8d27136e95/F/L/FLGFI8I1000012012_-00_Sweden-8-x-12-Stick-Flag_4.jpg"
                />
            </div>

        );
    }

    componentDidMount() {
        window.onkeydown = this.handleKeyDown;
    }
}

Player.propTypes = {
    size: PropTypes.number.isRequired,
    position: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired
    })
};

export default Player;
