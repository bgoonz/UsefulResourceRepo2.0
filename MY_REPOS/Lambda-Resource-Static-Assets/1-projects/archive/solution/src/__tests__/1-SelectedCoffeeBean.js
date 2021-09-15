import { useContext } from "react";
import { shallow, mount } from "enzyme";

import App from "../App";
import SelectedCoffeeBean from "../components/SelectedCoffeeBean";
import CoffeeProvider from "../context/CoffeeContext";

const mockFn = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"), // use actual for all non-hook parts
  useContext: jest.fn(),
}));

describe("SelectedCoffeeBean", () => {
  test('SelectedCoffeeBean renders a div with a class of "selected-coffee"', () => {
    useContext.mockImplementation(() => ({
      coffeeBean: { id: 5, name: "Set Bean" },
      setCoffeeBeanId: mockFn,
    }));
    const selected = mount(
      <CoffeeProvider>
        <SelectedCoffeeBean />
      </CoffeeProvider>
    );

    expect(selected.find("div.selected-coffee")).toHaveLength(1);
  });

  test("SelectedCoffeeBean renders an h2 with the name of the selected coffee's name", () => {
    useContext.mockImplementation(() => ({
      coffeeBean: { id: 5, name: "Set Bean" },
      setCoffeeBeanId: mockFn,
    }));
    const selected = mount(
      <CoffeeProvider>
        <SelectedCoffeeBean />
      </CoffeeProvider>
    );

    expect(selected.find("h2").text()).toEqual("Set Bean");
    expect(selected.find("h2").parent().is("div.selected-coffee")).toBe(true);
  });

  test("SelectedCoffeeBean is used by the App component", () => {
    const appWrapper = shallow(<App />);
    expect(appWrapper.find(SelectedCoffeeBean)).toHaveLength(1);
  });
});
