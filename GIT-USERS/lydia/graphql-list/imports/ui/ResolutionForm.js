import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Input, Button } from 'react-materialize';
import styled from 'styled-components';

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

class ResolutionForm extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  submitForm = () => {
    this.props.createResolution({
      variables: {
        name: this.inputRef.current.state.value,
      }
    }).catch(err => console.log(err));
  }


  render() {
    return (
      <FormList>
        <Input type='text' ref={this.inputRef} />
        <Button onClick={ this.submitForm }>Submit</Button>
      </FormList>
    );
  }
}

const FormList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px
`;

export default graphql(createResolution, {
  name: 'createResolution',
  options: {
    refetchQueries: ['Resolutions']
  }
})(ResolutionForm);
