import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/css/style.css';
import AppRouter from './routes/AppRouter';
// TODO: import { AuthProvider } from './auth/AuthProvider';

function App() {

  return (
    <div>
      {/* <AuthProvider> TODO: descomentar despues de configurar rutas privadas*/}
       <AppRouter />
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;