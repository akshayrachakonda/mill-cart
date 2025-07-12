import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import img3 from "./pictures/img3.jpg";
import Cookies from 'js-cookie'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { email: '', password: '' },
      error: '',
      displayMsg: '',
      loggedIn: false
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      },
      error: '', // Clear any previous errors
      displayMsg: '' // Clear any previous messages
    }));
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.formData;

    if (!email || !password) {
      this.setState({ error: 'Please enter both email and password' });
      return;
    }

    try {
      const apiUrl = 'http://localhost:3000/login';
      const options = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        console.log("Logged in successfully");
        this.setState({ 
          loggedIn: true,
          displayMsg: data.display_msg,
          error: ''
        });
        Cookies.set("jwt_token", data.jwtToken, { expires: 30 });
        const { history } = this.props;
        history.push("/");
        window.location.reload(false);
      } else {
        this.setState({ 
          error: data.display_msg || 'Invalid email or password',
          displayMsg: ''
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.setState({ 
        error: 'Error connecting to server. Please try again.',
        displayMsg: ''
      });
    }
  };

  render() {
    const { formData, displayMsg, error, loggedIn } = this.state;
    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="logc" style={{ backgroundImage: `URL(${img3})` }}>
        <div className="logc2">
          <center><h2>Login</h2></center>
          <div className="logc3">
            <form>
              <div className="inside">
                <label>Email:</label>
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={this.handleChange} 
                    required 
                  />
                </div>
                <label>Password:</label>
                <div>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={this.handleChange} 
                    required 
                  />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {displayMsg && <p style={{ color: 'green' }}>{displayMsg}</p>}
              </div>
              <div className="butn">
                <div>
                  <button className="btn1" type="submit" onClick={this.handleClick}>Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="acc">
          <p><center>Don't have an account? <Link to="/RegistrationForm">Register</Link></center></p>
        </div>
      </div>
    );
  }
}

export default Login;
