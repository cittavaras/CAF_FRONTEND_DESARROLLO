import React from "react";
import { Route, useNavigate } from "react-router-dom";
//import useAuth from '../auth/useAuth';

export default function PrivateRoute({...rest}) { //hasRole: tipoUsuario, 
  const navigate = useNavigate();
  //const { hasRole, isLogged } = useAuth();
  //const alumno = null
  const alumno = {id: 1, role: 'Alumno'};

  if(tipoUsuario && !hasRole(tipoUsuario)) return window.location.href = '/';

  //if(!isLogged()) return window.location.href = "/login"

  if(!alumno) return window.location.href = "/login"

  if(!alumno) return navigate('/login')

	return (
    <Route {...rest} />
  )
}