import { useContext } from "react";
import { mount, shallow } from "enzyme";

import App from "../App";
import SetCoffeeBean from "../components/SetCoffeeBean";
import CoffeeProvider from "../context/CoffeeContext";
import coffeeBeans from "../mockData/coffeeBeans.json";

const mockFn = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"), // use actual for all non-hook parts
  useContext: jest.fn(),
}));

describe("SetCoffeeBean", () => {
  test('SetCoffeeBean renders a div with a class of "set-coffee-bean"', () => {
    useContext.mockImplementation(() => ({
      coffeeBean: { id: 5, name: "Set Bean" },
      setCoffeeBeanId: mockFn,
    }));
    const setCoffee = mount(
      <CoffeeProvider>
        <SetCoffeeBean coffeeBeans={coffeeBeans} />
      </CoffeeProvider>
    );

    expect(setCoffee.find("div.set-coffee-bean")).toHaveLength(1);
    expect(setCoffee.find("h2").text()).toEqual("Select a Coffee Bean");
    expect(setCoffee.find("h2").parent().is("div.set-coffee-bean")).toBe(true);
  });

  test("SetCoffeeBean changes the context's coffee bean using the id of the bean", () => {
    useContext.mockImplementation(() => ({
      coffeeBean: { id: 5, name: "Set Bean" },
      setCoffeeBeanId: mockFn,
    }));
    const setCoffee = mount(
      <CoffeeProvider>
        <SetCoffeeBean coffeeBeans={coffeeBeans} />
      </CoffeeProvider>
    );

    expect(setCoffee.find("div.set-coffee-bean")).toHaveLength(1);
    expect(setCoffee.find("h2").text()).toEqual("Select a Coffee Bean");
    expect(setCoffee.find("h2").parent().is("div.set-coffee-bean")).toBe(true);

    setCoffee
      .find('select[name="coffee-bean"]')
      .simulate("change", { target: { value: "3" } });
    expect(mockFn.mock.calls[0][0]).toEqual("3");

    setCoffee
      .find('select[name="coffee-bean"]')
      .simulate("change", { target: { value: "6" } });
    expect(mockFn.mock.calls[1][0]).toEqual("6");
  });

  test("SetCoffeeBean selects the Liberica coffee bean in the select dropdown if it is selected", () => {
    useContext.mockImplementation(() => ({
      coffeeBean: {
        id: "3",
        name: "Liberica",
      },
      setCoffeeBeanId: mockFn,
    }));
    const setCoffee = mount(
      <CoffeeProvider>
        <SetCoffeeBean coffeeBeans={coffeeBeans} />
      </CoffeeProvider>
    );

    expect(setCoffee.find('select[name="coffee-bean"]').props().value).toEqual(
      "3"
    );
  });

  test("SetCoffeeBean selects the Robusta coffee bean in the select dropdown if it is selected", () => {
    useContext.mockImplementation(() => ({
      coffeeBean: {
        id: "2",
        name: "Robusta",
      },
      setCoffeeBeanId: mockFn,
    }));
    const setCoffee = mount(
      <CoffeeProvider>
        <SetCoffeeBean coffeeBeans={coffeeBeans} />
      </CoffeeProvider>
    );

    expect(setCoffee.find('select[name="coffee-bean"]').props().value).toEqual(
      "2"
    );
  });

  test("SetCoffeeBean is used by the App component", () => {
    const appWrapper = shallow(<App />);
    expect(appWrapper.find(SetCoffeeBean)).toHaveLength(1);
  });
});
