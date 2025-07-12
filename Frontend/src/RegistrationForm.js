import React, { Component } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import img3 from "./pictures/img3.jpg";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userName: "",
        email: "",
        companyName: "",
        gstIn: "",
        password: "",
        ConfirmPassword: "",
      },
      message: "",
      error: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((json) => this.setState({ message: json.display_msg }));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
      error: "", // Clear any previous errors
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password match
    if (this.state.formData.password !== this.state.formData.ConfirmPassword) {
      this.setState({ error: "Passwords do not match" });
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.formData.userName,
        email: this.state.formData.email,
        companyName: this.state.formData.companyName,
        gst: this.state.formData.gstIn,
        password: this.state.formData.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.display_msg === "Registration Successful") {
          this.setState({ 
            message: json.display_msg,
            formData: {
              userName: "",
              email: "",
              companyName: "",
              gstIn: "",
              password: "",
              ConfirmPassword: "",
            }
          });
        } else {
          this.setState({ message: json.display_msg });
        }
      })
      .catch((error) => {
        this.setState({ error: "Error connecting to server. Please try again." });
      });
  };

  render() {
    const { formData, message, error } = this.state;

    return (
      <div className="logc11" style={{ backgroundImage: `URL(${img3})` }}>
        <div className="logc22">
          <center>
            <h2> Register </h2>
          </center>
         
          <form onSubmit={this.handleSubmit}>
            <div className="inside2">
              <label>User Name: </label>
              <div>
                <input
                  name="userName"
                  type="text"
                  value={formData.userName}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Company Name:</label>
                <div>
                  <input
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gst IN:</label>
                <div>
                  <input
                    name="gstIn"
                    type="text"
                    value={formData.gstIn}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div>
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
              </div>
              <div>
                <label>Confirm Password:</label>
                <div>
                  <input
                    type="password"
                    name="ConfirmPassword"
                    value={formData.ConfirmPassword}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="butn">
              <div>
                <button className="btn1" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: message.includes('Success') ? 'green' : 'red' }}>{message}</p>}
        </div>
        <div className="acc">
          <p>
            <center>
              Already have an account? <Link to="/Login">Login</Link>{" "}
            </center>
          </p>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
