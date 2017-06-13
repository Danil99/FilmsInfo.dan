import React from 'react';

import NavLink from './NavLink.jsx';

import verify from './utils/verify.js'

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      image: '',
      settings: false
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
              username: res.username
            })
          }
        })
    }
  }

  render() {
    return (
      <header>
        <div className="header">
          <div className="title">
            <h1>FilmsInfo.dan</h1>
          </div>
          <nav>
            <ul>
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/contacts">Contacts</NavLink></li>
            </ul>
          </nav>
          {
            Boolean(localStorage.jwtToken) ?
              <div className="userInfo">
                <h3 onClick={() => this.setState({settings: !this.state.settings})}>{this.state.username}</h3>
                <div className="img-wrap">
                  <img src={this.state.image} alt="Alt" />
                </div>
                {
                  this.state.settings ?
                    <div className="user-settings">
                      <a href="/" onClick={() => localStorage.removeItem('jwtToken')}>Logout</a>
                      <NavLink onClick={() => this.setState({settings: false})} to="/settings">Settings</NavLink>
                    </div>
                    : false
                }
              </div>
                :
                  <NavLink className="log-button" to="/login">Login</NavLink>
          }
        </div>
      </header>
    )
  }
}

export default Header;
