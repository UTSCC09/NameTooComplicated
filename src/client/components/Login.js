import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore';

axios.defaults.baseURL = 'http://localhost:3001';

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signinEmail: '',
      signupEmail: '',
      signinPw: '',
      signupPw: '',
      signupPwConfirm: '',
      switchForm: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    var target = e.target;
    var name = target.name;
    console.log(name);
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var name = e.target.name;
    var submit = true;

    var params = new URLSearchParams();
    params.append('username', this.state[`${name}Email`]);
    params.append('password', this.state[`${name}Pw`]);
    if (name === 'signup' &&
     this.state[`${name}Pw`] !== this.state[`${name}PwConfirm`]) {
       submit = false;
    }

    (submit && axios
      .post(`/auth/${name}`, params)
      .then(function(response) {
        // success POST
        // close form through global store
        AuthStore.toggleForm(false);
        AuthStore.setUsername(response.data);
        console.log(response.data);
      })
      .catch(function(err) {
        console.log('err');
        console.log(err);
      }));

    this.setState({
      [`${name}Email`]: '',
      [`${name}Pw`]: '',
      [`${name}PwConfirm`]: ''
    });

    document.getElementById('form').reset();

  }

  toggleForm() {
    this.setState({
      switchForm: !this.state.switchForm
    });
  }

   renderSignup(){
    return (
      <div className="login-container">
        <div className="sign-up-google margin">
          <div id="my-signin2" />
        </div>
        <div className="or-form margin">
          <div className="seperator" />
          or
          <div className="seperator" />
        </div>
        <form id="form" onSubmit={this.handleSubmit} name="signup">
          <input
            id="email"
            className="margin"
            name="signupEmail"
            type="text"
            placeholder="Email"
            required
            value={this.state.signupEmail}
            onChange={this.handleInputChange}
          />
          <input
            className="margin"
            name="signupPw"
            type="password"
            placeholder="Enter Password"
            required
            minLength="6"
            value={this.state.signupPw}
            onChange={this.handleInputChange}
          />
          <input
            className="margin"
            name="signupPwConfirm"
            type="password"
            placeholder="Confirm Password"
            required
            minLength="6"
            value={this.state.signupPwConfirm}
            onChange={this.handleInputChange}
          />
          <button type="submit" value="submit">
            Sign-up
          </button>
        </form>
        <div className="seperator large-margin" />
        <div className="bottom mid-margin">
          <div>Already have a Squad Account?</div>
          <div className="bottom-text" onClick={this.toggleForm.bind(this)}>
            Log in
          </div>
        </div>
      </div>
    );
  }

  renderSignin() {
    return (
      <div className="login-container">
        <div className="sign-up-google margin">
          <div id="my-signin2" />
        </div>
        <div className="or-form margin">
          <div className="seperator" />
          or
          <div className="seperator" />
        </div>
        <form id="form" onSubmit={this.handleSubmit} name='signin'>
          <input
            id="email"
            className="margin"
            name="signinEmail"
            type="text"
            placeholder="Email"
            required
            value={this.state.signinEmail}
            onChange={this.handleInputChange}
          />
          <input
            className="margin"
            name="signinPw"
            type="password"
            placeholder="Password"
            minLength="6"
            value={this.state.signinPw}
            onChange={this.handleInputChange}
          />
        <button type="submit" value="submit" name="action">
            Sign-in
          </button>
        </form>
        <div className="seperator large-margin" />
        <div className="bottom mid-margin">
          <div>Don't have a Squad Account?</div>
          <div className="bottom-text" onClick={this.toggleForm.bind(this)}>
            Sign up
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>{this.state.switchForm ? this.renderSignin() : this.renderSignup()}</div>
    );
  }
}
//<div className="g-signin2" data-onsuccess="onSignIn"></div>
