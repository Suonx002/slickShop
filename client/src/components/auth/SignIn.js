import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const SignIn = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'red');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'red');
    } else {
      loginUser({
        email,
        password
      });
    }
  };

  const demoLogin = e => {
    if (email === '' && password === '') {
      setUser({
        email: 'demo@gmail.com',
        password: '123123'
      });
    }
  };

  return (
    <div className='ui container '>
      <h3
        className='ui header center aligned blue'
        style={{ margin: '2rem 0' }}>
        Account Login
      </h3>
      <div className='ui grid centered '>
        <form
          className='ui form fourteen wide mobile twelve wide tablet eight wide computer column centered segment'
          onSubmit={onSubmit}>
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

          <button type='submit' className='ui blue fluid button'>
            Login
          </button>
          <div className='content' style={{ marginTop: '1rem' }}>
            Don't have an account ?{' '}
            <Link to='/signup' className='item'>
              Sign Up
            </Link>
          </div>

          <div className='content' style={{ marginTop: '3rem' }}>
            <p style={{ textAlign: 'center' }}>-or-</p>
            <button
              type='submit'
              onClick={demoLogin}
              className='ui blue fluid button'>
              LOGIN AS DEMO USER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
