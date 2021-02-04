import React from 'react';
import { Redirect, Route } from 'react-router-dom';



export const CustomRoutes = ({
    rol,
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest}
            component={ (props) => (  
                ( isAuthenticated && (rol === 'Administrador' || rol === 'Candidato'))
                    ? <Component { ...props } />
                    : <Redirect to='/' />
             ) } 
        />
    )
}