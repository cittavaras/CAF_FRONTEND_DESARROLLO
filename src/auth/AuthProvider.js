import { createContext, useState } from "react";
import roles from "../helpers/roles";

export const AuthContext = createContext();

export default function AuthProvider({children}) {

    const [alumno, setAlumno ] = useState(null);  //useState({ id: 1, role: roles.alumno });

    const login = (userCredentials) => setAlumno(null); //Deberia ser una peticion backend { id: 1, role: roles.alumno }
    const logout = () => setAlumno(null);

    const isLogged = () => !!alumno;
    const hasRole = (tipoUsuario) => alumno.role === tipoUsuario;

    const contextValue = {
        alumno,
        isLogged,
        hasRole,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}