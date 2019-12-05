import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import ProductForm from './components/product/ProductForm';
import ProductDetail from './components/product/ProductDetail';

import PrivateRoute from './components/routing/PrivateRoute';
import ProductState from './context/product/ProductState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ProductState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <div className='ui container'>
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/create' component={ProductForm} />
                <Route exact path='/products/:id' component={ProductDetail} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/signin' component={SignIn} />
              </Switch>
            </div>
          </BrowserRouter>
        </AlertState>
      </ProductState>
    </AuthState>
  );
};

export default App;
