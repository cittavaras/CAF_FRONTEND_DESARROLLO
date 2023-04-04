import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/css/style.css';

import Navigation from "../components/Navigation";
import Inicio from "../pages/Inicio"
import Bienvenida from '../pages/Bienvenida';
import CrearAlumno from '../components/CrearAlumno'

import Notificacion from "../pages/notificacion";

import LandingPageAlumno from "../pages/LadingPageAlumno";
import BloquesDisponibles from "../pages/BloquesDisponibles";
import Login from '../pages/Login';
import MetricaAlumno from '../pages/MetricaAlumno';
import AdminPage from "../pages/AdminVista";
import ListarAlumno from "../components/ListarAlumno";

import NotFoundPage from "../pages/NotFoundPage";

import PrivateRoute from "./PrivateRouter"


export default function AppRouter(){
  return (
     <Router>
      <Navigation />
      <Routes>
          {/* Rutas publicas */}
          <Route path="/qr" element={<Inicio />} />
          <Route path="/" element={<Bienvenida />} />
          <Route path="/registro" Component={CrearAlumno} />

          {/* Creo que no deberia ser una ruta */}
          <Route path="/notificacion" element={<Notificacion />} />

          {/* Rutas privadas */}
          <PrivateRoute path="/landing" element={<LandingPageAlumno />} />
          <PrivateRoute path="/disponible" element={<BloquesDisponibles />} />
          <PrivateRoute path="/login" element={<Login />} />
          <PrivateRoute path="/metrica" element={<MetricaAlumno />} />
          <PrivateRoute path="/admin" element={<AdminPage />} />
          <PrivateRoute path="/listar" Component={ListarAlumno} />

          {/* Ruta que no existe */}
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
     </Router>
  )
}