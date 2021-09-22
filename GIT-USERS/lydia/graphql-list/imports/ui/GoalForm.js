import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Input, Button, Icon } from 'react-materialize';
import gql from 'graphql-tag';
import styled from 'styled-components';

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`

class GoalForm extends Component {
  constructor() {
    super();
    this.inputGoalRef = React.createRef();
  }

  submitForm = () => {
    this.props.createGoal({
      variables: {
        name: this.inputGoalRef.current.state.value,
        resolutionId: this.props.resolutionId,
      }
    })
    .then(() => this.inputGoalRef.current.state.value = '')
    .catch(err => console.log(err))
  }

  render() {
    return (
      <GoalInput>
        <Input type='text' ref={this.inputGoalRef} />
        <Button onClick={ this.submitForm }>+</Button>
      </GoalInput>
    );
  }
}

const GoalInput = styled.div`
  display: flex;
  align-items: center;
`;

export default graphql(createGoal, {
  name: 'createGoal',
  options: {
    refetchQueries: ['Resolutions']
  }
})(GoalForm);


