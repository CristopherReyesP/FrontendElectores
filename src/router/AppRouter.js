import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { EditPage } from '../pages/EditPage';
import { InicioPage } from '../pages/InicioPage';
import { RegistroVotantes } from '../pages/RegistroVotantes';
import { EditarUsuarios } from '../pages/EditarUsuarios';
import { AdminRoute } from './AdminRoute';
import { AuthRouter } from './AuthRouter';
import { CustomRoutes } from './customRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { RegisterPage } from '../pages/RegisterPage';
import { MapaPage } from '../pages/MapaPage';

export const AppRouter = () => {

  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [verificaToken])

  if (auth.checking) {
    return <h1>Espere por favor</h1>
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuthenticated={auth.logged} path='/auth' component={AuthRouter} />
          <PrivateRoute isAuthenticated={auth.logged} exact path="/" component={InicioPage} />
          <PrivateRoute isAuthenticated={auth.logged} path="/registroVotantes" component={RegistroVotantes} />
          <PrivateRoute isAuthenticated={auth.logged} path="/Edit" component={EditPage} />
          <AdminRoute isAuthenticated={auth.logged} path="/EditarUsuarios" component={EditarUsuarios} rol={auth.rol} />
          <CustomRoutes isAuthenticated={auth.logged} path="/register" component={RegisterPage} rol={auth.rol} />
          <CustomRoutes isAuthenticated={auth.logged} path="/Mapa" component={MapaPage} rol={auth.rol} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}
