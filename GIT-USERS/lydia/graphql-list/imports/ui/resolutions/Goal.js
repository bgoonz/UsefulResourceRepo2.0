import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Input } from 'react-materialize';
import gql from 'graphql-tag';
import styled from 'styled-components';

const toggleGoal = gql`
  mutation toggleGoal($id: String!) {
    toggleGoal(_id: $id) {
      _id
    }
  }
`;

class Goal extends Component {
  toggleGoal = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.goal._id,
      }
    });
  }

  render() {
    const { goal } = this.props;
    return (
      <GoalItem completed={ goal.completed }> 
        <Span>{ this.props.goal.name }</Span>
        <CheckBox
          type='checkbox'
          className='filled-in'
          checked={ goal.completed }
          onClick={ this.toggleGoal } />
      </GoalItem>
    );
  }
}

const GoalItem = styled.li`
  opacity: ${props => props.completed ? 0.2 : 1}
`

const Span = styled.span`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'}
`;

const CheckBox = styled.input`
  position: relative !important;
  left: 0px !important;
  opacity: 1 !important;
`

export default graphql(toggleGoal, {
  name: 'toggleGoal',
  options: {
    refetchQueries: ['Resolutions']
  }
})(Goal);
