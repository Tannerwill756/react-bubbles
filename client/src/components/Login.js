import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    account: {
      username: "",
      password: "",
    },
  };

  changeHandler = (e) => {
    e.preventDefault();
    this.setState({
      account: {
        ...this.state.account,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.account)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        this.props.history.push("/protected");
      })
      .catch((err) => console.log({ err }));
  };

  render() {
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.account.username}
            placeholder="Username Here"
            onChange={this.changeHandler}
          />

          <input
            type="text"
            name="password"
            value={this.state.account.password}
            placeholder="Password Here"
            onChange={this.changeHandler}
          />
          <button>Login</button>
        </form>
      </>
    );
  }
}
export default Login;
