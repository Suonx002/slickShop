import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const SignUp = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { registerUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error, 'red');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if ((name === '' || email === '', password === '')) {
      setAlert('Please enter all fields', 'red');
    }
    if (password.length < 6 || password2.length < 6) {
      setAlert('Password should be 6 or more characters', 'yellow');
    }
    if (password !== password2) {
      setAlert('Password do not match', 'red');
    } else {
      registerUser({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className='ui container '>
      <h3
        className='ui header center aligned blue'
        style={{ margin: '2rem 0 ' }}>
        Register Account
      </h3>
      <div className='ui grid centered'>
        <form
          className='ui form fourteen wide mobile twelve wide tablet eight wide computer column centered segment'
          onSubmit={onSubmit}>
          <div className='field'>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={name}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='password'
              name='password2'
              placeholder='Confirm Password'
              value={password2}
              onChange={onChange}
            />
          </div>
          <button type='submit' className='ui blue fluid button'>
            Sign Up
          </button>
          <div className='content' style={{ marginTop: '1rem' }}>
            Already have an account ?{' '}
            <Link to='/signin' className='item'>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
