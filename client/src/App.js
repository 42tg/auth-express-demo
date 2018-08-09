import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: 'admin',
        password: 'admin',
      }
  }

  handleLogin = (e) => {
    e.preventDefault()
    const {username, password} = this.state;
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({username, password})
    }
    fetch('http://localhost:5000/login', options).then(raw => raw.json()).then(data => {
      this.setState({... this.state, user: { ...data.user, token:data.token}})
    })
  }

  handleLogout = (e) => {
    e.preventDefault()
    const {user} = this.state
    const config = {method: 'POST', headers: {
      'Authorization': 'Bearer '+user.token,
      "Content-Type": "application/json; charset=utf-8"
    }}

    fetch('http://localhost:5000/logout', config).then(raw => raw.json()).then(data => {
      if(data.destroyed){
        this.setState({... this.state, user: undefined})
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    const {username, password, user} = this.state;

    return (
      <div className="App">

          <div className="login-wrap">
          {!user &&
            <div>
              <h2>Login</h2>
              <form className="form" onSubmit={this.handleLogin} autoComplete="off">
                <input type="text" placeholder="Username" name="username" onChange={this.handleChange} value={username}/>
                <input type="password" placeholder="Password" name="password" onChange={this.handleChange} value={password}/>
                <button> Sign in </button>
                <a > <p> Don't have an account? Register </p></a>
              </form>
            </div>
          }
          {user &&
            <div className="content">
              <h2>Welcome {user.username}</h2>
              <form className="form" onSubmit={this.handleLogout}>
                <code>
                  { JSON.stringify(user, null, 2) }
                </code>
                <button> Sign out </button>
              </form>
            </div>

          }
          </div>


      </div>
    );
  }
}

export default App;
