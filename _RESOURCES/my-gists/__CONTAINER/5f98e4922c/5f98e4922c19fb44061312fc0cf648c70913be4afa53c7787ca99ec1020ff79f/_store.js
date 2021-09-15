var store = createStore({
    // The same as #componentDidMount
    initialize: function () {
        this.listenTo(actionSet.a); // (actionSet.a, this.onA)
        this.listenToAll(actionSet2);
    },
    
    // Event listenter
    onA: function (data) {
        // the same as #setState
        this.set({
            a: this.state.a.concat(data.item),
            b: Math.max(data.age, this.state.b)
        });
    },
    
    // The same as #getInitialState
    defaults: function () {
        return {
            a: [],
            b: 2
        };
    },
    
    // Same as #render() but for data
    emit: function () {
        return {
            a: this.state.a,
            isEmpty: this.state.a.length === 0,
            b: this.state.b * 2
        };
    }
});
