import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ 
  isUnautenticated,
  component: Component,
  ...rest 
}) => (
  <Route {...rest} component={(props) => (
    isUnautenticated ? (
      <div>
        <Component {...props}/>
      </div>
    ) : (
      <Redirect to='/dashboard'/>
    )
  )} />
);

const mapStateToProps = (state) => ({
  isUnautenticated: !state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);