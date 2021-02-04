import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket'


export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
    const [votanteActualizado, setVotanteActualizado] = useState('');
    const [votanteNuevo, setVotanteNuevo] = useState('');
    const [votanteEditado, setVotanteEditado] = useState('');
    // const [marcador, setMarcador] = useState('');
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { auth } = useContext(AuthContext);


    useEffect(() => {
        if (auth.logged) {
            conectarSocket();
        }
    }, [auth, conectarSocket])

    useEffect(() => {
        if (!auth.logged) {
            desconectarSocket();
        }
    }, [auth, desconectarSocket])

    useEffect(() => {

        socket?.on('Eliminar', (idEliminado) => {
            setVotanteActualizado(idEliminado);
        });

    }, [socket])

    useEffect(() => {

        socket?.on('Editar', (Editado) => {
            setVotanteEditado(Editado);
        });

    }, [socket])

    useEffect(() => {
        socket?.on('Datos-Votante', ( votante ) => {
            setVotanteNuevo(votante);
        });
    }, [socket])

    return (
        <SocketContext.Provider value={{ socket, online, votanteActualizado, votanteNuevo, votanteEditado }}>
            { children}
        </SocketContext.Provider>
    )
}