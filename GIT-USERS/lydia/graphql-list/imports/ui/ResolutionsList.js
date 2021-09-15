import React from 'react';
import styled from 'styled-components';

import GoalForm from './GoalForm';
import Goal from './resolutions/Goal';

export const ResolutionsList = ({loading, resolutions}) => (
  <List>
  { !loading && resolutions.map(res => 
    <GoalItem key={res._id} completed={ res.completed }>
      <Item>{res.name}</Item>
      <GoalForm resolutionId={res._id} />
      <List>
        { res.goals.map(x => <Goal goal={x} key={x._id} /> )}
      </List>
    </GoalItem>
   )}
  </List>
);

const Item = styled.span`
  color: black;
  font-family: 'Arial', sans-serif;
  font-size: 13px;
  width: 100px;
`;

const List = styled.ul`
  list-style: none;
`;

const GoalItem = styled.li`
  margin: 50px 0px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  opacity: ${props => props.completed ? 0.2 : 1};
  transition: .4s linear;
`;