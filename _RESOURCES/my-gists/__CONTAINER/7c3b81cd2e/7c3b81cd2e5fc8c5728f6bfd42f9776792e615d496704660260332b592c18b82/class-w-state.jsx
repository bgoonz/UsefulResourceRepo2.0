import React, { Component } from 'react';

class ClassComponentWithState extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>Hello World!</div>
        );
    }
}

export default ClassComponentWithState;