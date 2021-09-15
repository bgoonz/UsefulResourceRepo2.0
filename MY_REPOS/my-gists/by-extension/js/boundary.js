class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }

  unstable_handleError(err) {
    report(err);
    this.setState({ err })
  }
  
  render() { 
    return this.state.err ? <ErrorPage /> : this.props.children;
  }
}

// Usage:
// <Boundary><ComponentThatMayThrow /></Boundary>
// Currently only works for mounting.