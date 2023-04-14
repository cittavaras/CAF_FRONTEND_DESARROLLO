import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/css/style.css';
import AppRouter from './routes/AppRouter';
import AuthProvider  from './auth/AuthProvider';

function App() {

  return (
    <div>

      <AuthProvider>
       <AppRouter />
      </AuthProvider>
      
    </div>
  );
}

export default App;