import React from "react";
import { Route } from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function PrivateRoute(props) {

  const { isLogged } = useAuth();

  if(isLogged()) return window.location.href = "/landing"

	return (
    <Route {...props} />
  )
}