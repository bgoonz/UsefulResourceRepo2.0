import { shallow, mount } from "enzyme";
import { render, fireEvent, getByTestId, cleanup } from "react-testing-library";
import React from "react";
import renderer from "react-test-renderer";

import SignUpBox from "./SignUpBox";

afterEach(cleanup);

// Begin client-side tests
describe("With Enzyme", () => {
  it('SignUpBox shows "Sign Up"', () => {
    const signup = shallow(<SignUpBox />);
    expect(signup.find("h1").text()).toEqual("Sign Up");
  });
});

describe("With Snapshot Testing", () => {
  it('SignUpBox shows "Sign Up"', () => {
    const component = renderer.create(<SignUpBox />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("SignUpBox elements", () => {
  it("has an input field for email", () => {
    const wrapper = mount(<SignUpBox />);
    const emailInput = wrapper.find("#email");
    expect(emailInput.exists()).toEqual(true);
    expect(emailInput.matchesElement(<input id="email" />)).toEqual(true);
  });

  it("has an input field for password", () => {
    const wrapper = mount(<SignUpBox />);
    const passwordInput = wrapper.find("#password");
    expect(passwordInput.exists()).toEqual(true);
    expect(passwordInput.matchesElement(<input id="password" />)).toEqual(true);
  });

  it("has has a submit button", () => {
    const wrapper = mount(<SignUpBox />);
    const submitButton = wrapper.find("button");
    expect(submitButton.exists()).toEqual(true);
    expect(submitButton.text()).toEqual("Sign Up");
  });
});

describe("Results of SignUpBox events", () => {
  it("renders <p> tag and displays appropriate message", () => {
    const wrapper = mount(<SignUpBox />);
    const submitButton = wrapper.find("button");
    submitButton.simulate("click");
    expect(wrapper.find("p").exists()).toEqual(true);

    // input form fields are completely empty
    expect(wrapper.find("p").text()).toEqual(
      "Password must be at least 6 characters in length"
    );
  });
});

test("SignUpBox loads with intitial state of '' ", () => {
  const { container } = render(<SignUpBox />);
  const emailVal = getByTestId(container, "emailVal");
  expect(emailVal.value).toEqual("");
  const passVal = getByTestId(container, "passVal");
  expect(passVal.value).toEqual("");
});

test("SignUpBox changes state after input", () => {
  const { container } = render(<SignUpBox />);
  const emailVal = getByTestId(container, "emailVal");
  const passVal = getByTestId(container, "passVal");

  fireEvent.change(emailVal, { target: { value: "bobbyp@pmail.com" } });
  fireEvent.change(passVal, { target: { value: "123" } });

  expect(emailVal.value).toEqual("bobbyp@pmail.com");
  expect(passVal.value).toEqual("123");
});

test("SignUpBox displays error message for short password", () => {
  const { container } = render(<SignUpBox />);
  const emailVal = getByTestId(container, "emailVal");
  const passVal = getByTestId(container, "passVal");
  const submitBtn = getByTestId(container, "submitBtn");

  fireEvent.change(emailVal, { target: { value: "bobbyp@pmail.com" } });
  fireEvent.change(passVal, { target: { value: "123" } });

  fireEvent.click(submitBtn);
  const messageVal = getByTestId(container, "messageVal");

  expect(messageVal.textContent).toEqual(
    "Password must be at least 6 characters in length"
  );
});

test("SignUpBox displays error message for non-alphanumeric characters", () => {
  const { container } = render(<SignUpBox />);
  const emailVal = getByTestId(container, "emailVal");
  const passVal = getByTestId(container, "passVal");
  const submitBtn = getByTestId(container, "submitBtn");

  fireEvent.change(emailVal, { target: { value: "bobbyp@pmail.com" } });
  fireEvent.change(passVal, { target: { value: "123-456" } });

  fireEvent.click(submitBtn);
  const messageVal = getByTestId(container, "messageVal");

  expect(messageVal.textContent).toEqual(
    "Password must only contain alphanumeric characters"
  );
});
