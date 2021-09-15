import { connectLean } from "lean-redux";
import React, { Component } from "react";
import styled from "styled-components";

import Entry from "./shared/Entry";
import LinkTo from "./shared/LinkTo";
import MemberForm from "./MemberForm";
import PageTitle from "./shared/PageTitle";

const Wrapper = styled.section``;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  > * {
    margin-left: 20px;
    margin-right: 20px;
  }
`;
const Button = styled.button`
  padding: 10px;
`;

const ToggleFormButton = ({ onClick }) => (
  <Button onClick={onClick}>Toggle form</Button>
);

class Members extends Component {
  componentDidMount() {
    const { fetchMembers } = this.props;
    fetchMembers();
  }

  render() {
    const { members, onToggleForm, onMemberFormSubmit } = this.props;

    return (
      <Wrapper>
        <Grid>
          <PageTitle>Members</PageTitle>
          <ToggleFormButton onClick={onToggleForm} />
        </Grid>

        <MemberForm onSubmit={onMemberFormSubmit} />
        <div className="entries">
          {members.map((member) => (
            <LinkTo key={member.id} target={member.url}>
              <Entry>{member.displayName}</Entry>
            </LinkTo>
          ))}
        </div>
      </Wrapper>
    );
  }
}

const Connected = connectLean({
  getInitialState() {
    return { members: [] };
  },
  fetchMembers() {
    fetch("/api/members")
      .then((res) => res.json())
      .then((members) => this.setState({ members }));
  },
  onToggleForm() {
    console.log("TODO: toggle form !");
  },
  onMemberFormSubmit() {
    this.fetchMembers();
  },
})(Members);

export default Connected;
