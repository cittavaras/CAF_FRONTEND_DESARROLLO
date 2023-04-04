import { Route, Navigate } from 'react-router-dom';

export default function PrivateRoute(props) {

  const alumno = null;
  
  if (!alumno) return <Navigate to="/login" />;

	return (
    <Route {...props} />
  )
}