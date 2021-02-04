
import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { VotanteProvider } from './context/VotanteContext';
import { AppRouter } from './router/AppRouter';

export const CensoApp = () => {
    return (
        <AuthProvider>
            <VotanteProvider>
                <SocketProvider >
                    <AppRouter />
                </SocketProvider>
            </VotanteProvider>
        </AuthProvider>
    )
}
