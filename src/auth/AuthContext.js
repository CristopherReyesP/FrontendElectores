import React, { createContext, useCallback, useState } from "react";
import {fetchConToken, fetchSinToken} from '../helpers/fetch';

export const AuthContext = createContext();


const initialState = {

    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
    rol: null,
    vinculo: null,

};

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialState);

    const login = async(email, password ) => {

        const resp = await fetchSinToken('login', { email, password }, 'POST');
        if(resp.ok){
            localStorage.setItem('token',resp.token);
            const { usuario } = resp;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                vinculo: usuario.vinculo,
            });
        }

        return resp.ok;
    }

    const register = async(email, password, nombre, rol, vinculo) => {
            const resp = await fetchSinToken('login/new', { email, password, nombre, rol, vinculo }, 'POST');
            return resp.ok;
    }

    const EditarYEncriptar = async(email, password, nombre, rol, vinculo, uid) => {
        const resp = await fetchSinToken('login/EditarYEncriptar', { email, password, nombre, rol, vinculo, uid }, 'POST');
        return resp.ok;
}

    const EditarSinEncriptar = async(email, password, nombre, rol, vinculo, uid) => {
        const resp = await fetchSinToken('login/EditarSinEncriptar', { email, password, nombre, rol, vinculo, uid }, 'POST');
        return resp.ok;
}

    const verificaToken = useCallback( async() => {

        const token = localStorage.getItem('token');
//si token no existe
        if (!token) {
          setAuth({
                uid: null,
                checking: false,
                logged: false,
            })

            return false;
        }  
        const resp = await fetchConToken('login/renew');

        if(resp.ok){
            localStorage.setItem('token',resp.token);
            const { usuario } = resp;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                vinculo: usuario.vinculo,
            });
            return true;
        }else{
            setAuth({
                checking: false,
                logged: false,
            });

            return false;
        }

    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false,
        });
    }

    return (
        <AuthContext.Provider  value={{
            auth,
            login,
            register,
            verificaToken,
            logout,
            EditarSinEncriptar,
            EditarYEncriptar,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
