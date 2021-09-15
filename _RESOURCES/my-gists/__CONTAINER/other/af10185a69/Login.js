import React from "react";
import connect from "../store/connect";
import axios from "axios";

// Can be also axios call but must resolve into
// object with payload and type

const addDelay = async (delay = 2000) => {
  return new Promise((res) => setTimeout(() => res(), delay));
};

const getPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return {
    type: "SOME_TYPE",
    payload: res.data,
  };
};

class Login extends React.Component {
  async componentDidMount() {
    // just adding here some delay so we can se original data
    // Delay 2 sec
    await addDelay(2000);
    this.props.dispatch(getPosts);
  }

  render() {
    const { data, someData } = this.props;
    return (
      <>
        <p>{JSON.stringify(data)}</p>
        <p>{JSON.stringify(someData)}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data2,
    someData: state.someData,
  };
};

export default connect(mapStateToProps)(Login);
