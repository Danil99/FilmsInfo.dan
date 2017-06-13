import React from 'react';
import axios from 'axios';

import verify from '../utils/verify.js'

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      username: '',
      email: '',
      password: '',
      edit: false
    }
  }

  componentWillMount() {
    if(Boolean(localStorage.jwtToken)) {
      verify()
        .then(res => {
          if(res == 'The token is not verify') {
            localStorage.removeItem('jwtToken');
            window.location.href = "/";
          } else {
            this.setState({
              image: res.image,
              username: res.username,
              email: res.email,
              password: res.password
            })
          }
        })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let newSett = {
      image: this.state.image,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      token: localStorage.jwtToken
    }
    axios.put('http://localhost:8080/editSett', newSett)
      .then(res => {
        if(res.data == 'The token is not verify') {
          localStorage.removeItem('jwtToken');
          window.location.href = "/";
        } else if(res.data !== 'OK') {
          const token = res.data.token;
          localStorage.setItem('jwtToken', token);
        }
      })

    this.setState({edit: false})
  }

  editSettings() {
    return (
      <section className="settings">
        <div className="sett-param">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              <h2>Username:</h2>
              <input type="text" onChange={event => this.setState({username: event.target.value})} value={this.state.username} />
            </label>
            <label>
              <h2>Email:</h2>
              <input type="text" onChange={event => this.setState({email: event.target.value})} value={this.state.email} />
            </label>
            <label>
              <h2>Password:</h2>
              <input type="text" onChange={event => this.setState({password: event.target.value})} value={this.state.password} />
            </label>
            <label>
              <h2>Image URL:</h2>
              <input type="text" onChange={event => this.setState({image: event.target.value})} value={this.state.image} />
            </label>
            <button>Save</button>
          </form>
        </div>
      </section>
    )
  }

  stateSettings() {
    return (
      <section className="settings">
        <div className="edit">
          <h2 onClick={() => this.setState({edit: true})}>Edit</h2>
        </div>
        <div className="img-wrap">
          <img src={this.state.image} alt="Alt" />
        </div>
        <div className="title">
          <h2>{this.state.username}</h2>
        </div>
        <div className="sett-param">
          <div className="sett sett-email">
            <h2>Email:</h2>
            <span>{this.state.email}</span>
          </div>
          <div className="sett sett-image">
            <h2>Image URL:</h2>
            <span>{this.state.image}</span>
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      this.state.edit ?
        this.editSettings()
          :
            this.stateSettings()
    )
  }
}

export default Settings;
