import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { SocketContext } from '../context/SocketContext';
import { fetchConToken } from '../helpers/fetch';

export const Cards = () => {
  const { auth } = useContext(AuthContext);
  const [totalVotantes, setTotalVotantes] = useState([]);
  const { votanteActualizado, votanteNuevo } = useContext( SocketContext );
  useEffect(() => {
    const obtenerTotalVotantes = async () => {
      let data= [];
      if (auth.rol==='Administrador') {
         data = Object.values(await fetchConToken(`votantes/todos/votantes`));
      } else {
         data = Object.values(await fetchConToken(`votantes/${auth.uid}`)); 
      }

      const elemento = data.map(e => ({ municipio: e.municipio }))
      setTotalVotantes(elemento);
    }
    obtenerTotalVotantes();
  }, [auth, votanteActualizado, votanteNuevo]);


  const cardStyle = {
    width: '17rem'
  }

  return (
    <>
      <div className="container  p-3 mt-5 mb-5"  >
        <div className="d-flex justify-content-evenly flex-wrap">

          <div className="card border-primary border-3 mb-1" style={cardStyle} >
            <center>
              <div className="card-header fs-4">Total de Electores Registrados</div>
            </center>
            <div className="card-body text-primary">
              <center>
                <h1 className="card-title">{totalVotantes.length}</h1>
              </center>

            </div>
          </div>


        </div>
      </div>
    </>
  )
}
