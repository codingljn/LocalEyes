import React from 'react';
import './Form.css';

const Form = props => (
  <form className="login">
    <h3>{props.is_register ? 'Register' : 'Login'}</h3>
    {props.show_auth_error ? <p className="error">{props.error_message}</p> : ''}
    <input
      type="text"
      placeholder="Email"
      value={props.email}
      onChange={props.handleChange}
      name="email" />
    <input
      type="password"
      placeholder="Password"
      value={props.password}
      onChange={props.handleChange}
      name="password" />
    <div className="row">
      <button onClick={props.authenticate}>Submit</button>
      <button className="cancel" onClick={props.closeForm}>Cancel</button>
    </div>
    <div className="toggle row x-center y-center">
      <span>Register</span>
      <div className="toggle-bar" onClick={props.toggleFormState}>
        <span className={`${!props.is_register ? 'toggle' : ''}`}></span>
      </div>
      <span>Login</span>
    </div>
  </form>
);

export default Form;