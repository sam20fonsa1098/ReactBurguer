import React, {useEffect, Suspense} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Layout from '../hoc/Layout/Layout'
import BurguerBuilder from './BurguerBuilder/BurguerBuilder'
import Logout from '../containers/Auth/Logout/Logout';
import * as actions from '../store/actions/index';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'


const AsyncCheckout = React.lazy(() => {
  return import('../containers/Checkout/Checkout');
});

const AsyncOrders = React.lazy(() => {
  return import('../containers/Orders/Orders')
})

const AsyncAuth = React.lazy(() => {
  return import('../containers/Auth/Auth')
})

const App = props => {
  const {onTryAutoSignup} = props
  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path = "/auth"   render = {(props) => <AsyncAuth {...props}/>}/>
      <Route path = "/" exact component = {BurguerBuilder} /> 
      <Redirect to = "/"/>
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
          <Route path = "/checkout" render    = {(props) => <AsyncCheckout {...props}/>}/>
          <Route path = "/orders"   render    = {(props) => <AsyncOrders {...props}/>}/>
          <Route path = "/logout"   component = {Logout}/>
          <Route path = "/auth"     render    = {(props) => <AsyncAuth {...props}/>}/>
          <Route path = "/"         component = {BurguerBuilder} /> 
          <Redirect to = "/"/>
        </Switch>
    );
  }
  return(
    <Layout>
      <Suspense fallback = {<p>Loading...</p>}>
        {routes}
      </Suspense>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const matDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, matDispatchToProps)(App));
