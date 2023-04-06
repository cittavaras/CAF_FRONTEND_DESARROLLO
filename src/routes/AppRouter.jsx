import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/css/style.css';

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

import Layout from "../layouts/Layout";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from './PublicRoute';
import roles from '../helpers/roles';
import routes from '../helpers/routes';


export default function AppRouter(){
  return (
     <Router>
      <Layout>
        <Routes>
            {/* Rutas publicas */}
            <Route path="/qr" element={<Inicio />} />
            <Route path="/" element={<Bienvenida />} />
            <Route path="/registro" Component={CrearAlumno} />
            <Route path="/login" element={<Login />} />
            <Route path="/notificacion" element={<Notificacion />} />

            {/* Rutas privadas */}
            <PrivateRoute path="/landing" element={<LandingPageAlumno />} />
            <PrivateRoute path="/disponible" element={<BloquesDisponibles />} />
            <PrivateRoute path="/metrica" element={<MetricaAlumno />} />
            <PrivateRoute path="/admin" element={<AdminPage />} />
            <PrivateRoute path="/listar" Component={ListarAlumno} />

            {/* TODO: Despues de configurar rutas privadas y roles cambiar linea 43 y 44 en 
            todas las lineas reemplazar path="" por path={routes.registro} por ejemplo
            <Route hasRole={roles.admin} path="/admin" element={<AdminPage />} />
            <Route hasRole={roles.admin} path="/listar" Component={ListarAlumno} /> */}

            {/* Ruta que no existe */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>  
     </Router>
  )
}