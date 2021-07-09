const store = createStore({
  // The same as #componentDidMount
  initialize() {
    this.listenTo(actionSet.a); // (actionSet.a, this.onA)
    this.listenToAll(actionSet2);
  },

  // Event listenter
  onA({ item, age }) {
    // the same as #setState
    this.set({
      a: this.state.a.concat(item),
      b: Math.max(age, this.state.b),
    });
  },

  // The same as #getInitialState
  defaults() {
    return {
      a: [],
      b: 2,
    };
  },

  // Same as #render() but for data
  emit() {
    return {
      a: this.state.a,
      isEmpty: this.state.a.length === 0,
      b: this.state.b * 2,
    };
  },
});
