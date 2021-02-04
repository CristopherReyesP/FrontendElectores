import React from 'react';
import { Redirect, Route } from 'react-router-dom';



export const AdminRoute = ({
    rol,
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest}
            component={ (props) => (  
                ( isAuthenticated && rol === 'Administrador' )
                    ? <Component { ...props } />
                    : <Redirect to='/' />
             ) } 
        />
    )
}