import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../css/mapa.css';

export const Nav = () => {

  const { auth, logout } = useContext( AuthContext );


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 z-index">
        <div className="container-fluid text-white">
          <label className="navbar-brand " >Bienvenido: {auth.name}</label>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
              <Link className="btn btn-primary" to="/"  >Inicio</Link>
              </li>
              <li className="nav-item">
              <Link className="btn btn-primary" to="/registroVotantes" >Registrar Electores</Link>
              </li>
              {(auth.rol === 'Candidato' || auth.rol === 'Administrador') ?
                                <>
              <li className="nav-item">
              <Link className="btn btn-primary" to="/Mapa">Mapa</Link>
              </li>
              {(auth.rol ==='Candidato')?
              <li className="nav-item">
              <Link className="btn btn-primary" to="/register">Usuarios</Link>
              </li>
              :
              <>
              <li className="nav-item dropdown">
              <button className="btn btn-primary" data-bs-toggle="dropdown" >
               Usuarios <i className="fas fa-caret-down"/>
             </button>
             <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
             <Link className="dropdown-item" to="/register">Registrar</Link>
             <Link className="dropdown-item" to="/EditarUsuarios">Editar</Link>
             </ul>
            </li>
              </>
              }   
              </>:<></>}
              <li className="nav-item">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={ logout }
              >
                Salir
              </button>

              </li>
            </ul>
          </div>
        </div>
      </nav>
      </>
    )
}
