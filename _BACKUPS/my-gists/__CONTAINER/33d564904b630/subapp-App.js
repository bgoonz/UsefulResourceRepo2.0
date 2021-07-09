// This is our subapp's root connected component.
// It can render more components, connected or not, below, just like normally.
// Usually we'd render it in <Provider> and be done with it.

class App extends Component { ... }
export default connect(mapStateToProps)(App)