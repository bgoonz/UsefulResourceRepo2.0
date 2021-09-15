const HelloMessage = props => <div>
        Hello {props.name}
      </div>;

ReactDOM.render(<HelloMessage name="Taylor" />, document.getElementById('hello-example'));