import React from 'react';
import axios from 'axios';

import jwt from 'jsonwebtoken';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorInput: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({errorInput: false})
    let user = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('http://localhost:8080/login', user)
      .then(res => {
        if(res.data == 'error') {
          this.setState({errorInput: true})
        } else {
          const token = res.data.token;
          localStorage.setItem('jwtToken', token);
          window.location.href = "/";
        }
      })
  }

  onUsername(event) {
    let username = event.target.value;
    this.setState({username})
  }

  onPassword(event) {
    let password = event.target.value;
    this.setState({password})
  }

  render() {
    return (
      <section className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <span>Username / Email</span>
            <input value={this.state.username} onChange={this.onUsername.bind(this)} type="text" name="email" placeholder="Name" />
          </label>
          <label>
            <span>Password</span>
            <input value={this.state.password} onChange={this.onPassword.bind(this)} type="password" name="password" placeholder="Password" />
          </label>
          {
            this.state.errorInput ?
              <span>Incorrect Login or Password</span>
              : false
          }
          <button>Login</button>
        </form>
      </section>
    )
  }
}

export default Login;
