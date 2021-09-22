import React, { useState } from "react";
import { StateContext } from "../state-context";

const connect = (selectState) => (Component) => {
  class Connect extends React.Component {
    dispatch = (action) => {
      this.context.dispatch(action);
    };

    render() {
      const slice = selectState(this.context.store);
      return <Component {...slice} dispatch={this.dispatch}></Component>;
    }
  }
  Connect.contextType = StateContext;
  return Connect;
};

const resolveInitialData = (reducers) => {
  const store = {};
  Object.keys(reducers).forEach((reducer) => {
    store[reducer] = reducers[reducer](undefined, {});
  });

  return store;
};

export const StoreProvider = ({ children, store: reducers }) => {
  const [store, setStore] = useState(resolveInitialData(reducers));

  const dispatch = async (dataSource) => {
    const action = await dataSource();
    Object.keys(reducers).forEach((reducer) => {
      const data = reducers[reducer](store[reducer], action);
      setStore({ ...store, [reducer]: data });
    });
  };
  return (
    <StateContext.Provider value={{ store, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default connect;
