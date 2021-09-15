import { Control, Errors, LocalForm, actions } from "react-redux-form";
import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";

//eslint-disable-next-line no-unused-expressions
injectGlobal` 
  .error {
    font-size: small;
    color: red;
  }
`;

const Button = styled.button`
  padding: 10px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  text-align: right;
  > * {
    flex: 1;
    :nth-child(1) {
      margin-left: 20px;
      margin-right: 20px;
    }
    :nth-child(2) {
      margin-right: 20px;
    }
  }
`;
const FormRow = styled(({ children, className }) => (
  <Grid className={className}>{children}</Grid>
))`
  margin-bottom: 5px;
  input,
  textarea {
    width: 100%;
    box-sizing: border-box;
  }
  label:after {
    content: ":";
  }
`;

const initialState = { infos: {} };

const isRequired = (val) => val && val.length > 0;

export default class extends Component {
  constructor(props) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  resetForm() {
    this.formDispatch(actions.change("member", initialState));
  }

  onSubmit(values) {
    fetch("/api/members", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(values),
    })
      .then(this.props.onSubmit)
      .then(this.resetForm);
  }

  render() {
    return (
      <LocalForm
        getDispatch={(dispatch) => (this.formDispatch = dispatch)}
        initialState={initialState}
        model="member"
        onSubmit={this.onSubmit}
      >
        <FormRow>
          <label htmlFor="member.infos.firstname">First name</label>
          <div>
            <Control.text model="member.infos.firstname" />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="member.infos.lastname">Lastname</label>
          <div>
            <Control.text model="member.infos.lastname" />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="member.displayName">Display name</label>
          <div>
            <Control.text
              model="member.displayName"
              validators={{ isRequired }}
            />
            <Errors
              component={({ children }) => (
                <div className="error">{children}</div>
              )}
              messages={{ isRequired: "Required." }}
              model="member.displayName"
              show={(field) => field.touched && !field.valid}
            />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="member.slug">Slug</label>
          <div>
            <Control.text model="member.slug" />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="member.infos.address">Address</label>
          <div>
            <Control.textarea model="member.infos.address" />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="member.infos.fbProfileUrl">FB profile URL</label>
          <div>
            <Control.text model="member.infos.fbProfileUrl" />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="member.infos.introUrl">Intro URL</label>
          <div>
            <Control.text model="member.infos.introUrl" />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="member.infos.email">Email</label>
          <div>
            <Control.text model="member.infos.email" type="email" />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="member.infos.phone">Phone</label>
          <div>
            <Control.text model="member.infos.phone" />
          </div>
        </FormRow>
        <FormRow>
          <div />
          <div>
            <Button>Save</Button>
          </div>
        </FormRow>
      </LocalForm>
    );
  }
}
