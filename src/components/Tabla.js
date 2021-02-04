import React, { useContext, useEffect, useState } from 'react';
import { fetchConToken } from '../helpers/fetch';
import { AuthContext } from '../auth/AuthContext';
import { useHistory } from 'react-router-dom';
import { VotanteContext } from '../context/VotanteContext';
import useMediaQuery from '../hooks/useMediaQuery';
import DataTable from 'react-data-table-component';
import { VotantesCards } from './VotantesCards';
import { Pagination } from './Pagination';
import { Buscador } from './Buscador';
import { Reporte } from './Reporte';
import { scrollToBottomAnimated } from './scrollToBottom';
import { SocketContext } from '../context/SocketContext';
import Swal from 'sweetalert2';
import { VentanaModal } from './Modal';


export const Tabla = () => {
  const history = useHistory();
  const matches = useMediaQuery("(min-width: 600px)");
  const { auth } = useContext(AuthContext);
  const { registrarElector } = useContext(VotanteContext);
  const { socket } = useContext(SocketContext);
  const [filtro, setFiltro] = useState([]);
  const [votante, setVotante] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [vista, setVista] = useState('Tabla');
  const [usuarios, setUsuarios] = useState([]);
  const obtenerVotantes = async () => {
    let data = [];
    if (auth.rol === 'Administrador') {
      data = Object.values(await fetchConToken(`votantes/todos/votantes`));
    } else {
      data = Object.values(await fetchConToken(`votantes/${auth.uid}`));
    }

    const elemento = data.map(e => (
      {
        id: e._id,
        nombre: e.nombre,
        domicilio: e.domicilio,
        sexo: e.sexo,
        fechaNacimiento: e.fechaNacimiento,
        claveElector: e.claveElector,
        Registro: e.Registro,
        curp: e.curp,
        estado: e.estado,
        localidad: e.localidad,
        municipio: e.municipio,
        seccion: e.seccion,
        emision: e.emision,
        vigencia: e.vigencia,
        digitador: e.digitador,
        preguntaUno: e.preguntaUno,
        preguntaDos: e.preguntaDos,
        preguntaTres: e.preguntaTres,
        voto: e.voto
      })
    )
    elemento.forEach((e) => {
      usuarios.forEach( us => {
        if(e.digitador == us.uid){
          e.digitador = us.nombre;
        }
      })
    });
    setVotante(elemento);
  }
  useEffect(() => {
    const InicialVotantes = async () => {
      let data = [];
      if (auth.rol === 'Administrador') {
        data = Object.values(await fetchConToken(`votantes/todos/votantes`));
      } else {
        data = Object.values(await fetchConToken(`votantes/${auth.uid}`));
      }
      const elemento = data.map(e => (
        {
          id: e._id,
          nombre: e.nombre,
          domicilio: e.domicilio,
          sexo: e.sexo,
          fechaNacimiento: e.fechaNacimiento,
          claveElector: e.claveElector,
          Registro: e.Registro,
          curp: e.curp,
          estado: e.estado,
          localidad: e.localidad,
          municipio: e.municipio,
          seccion: e.seccion,
          emision: e.emision,
          vigencia: e.vigencia,
          digitador: e.digitador,
          preguntaUno: e.preguntaUno,
          preguntaDos: e.preguntaDos,
          preguntaTres: e.preguntaTres,
          voto: e.voto
        })
      )

      elemento.forEach((e) => {
        usuarios.forEach( us => {
          if(e.digitador == us.uid){
            e.digitador = us.nombre;
          }
        })
      });
      setVotante(elemento);
    }
    InicialVotantes();
  }, [auth, usuarios]);

  useEffect(() => {
    const InicialUsuarios = async () => {
        const data = Object.values(await fetchConToken(`usuarios/todoslos/usuarios`));
        setUsuarios(data);
    }
    InicialUsuarios();
}, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtro.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Editar = async (id) => {
    await registrarElector(id);
    history.push('/Edit');
  }

  const Eliminar = async (id) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Registro eliminado',
      showConfirmButton: false,
      timer: 1500
    })
    await socket.emit('Eliminar', id);
    await obtenerVotantes();
  }

  const columnas = [
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true
    },
    {
      name: 'Domicilio',
      selector: 'domicilio',
      sortable: true
    },
    {
      name: 'Sexo',
      selector: 'sexo',
      sortable: true
    },
    {
      name: 'Sección',
      selector: 'seccion',
      sortable: true
    },
    {
      name: 'Municipio',
      selector: 'municipio',
      sortable: true
    },
    {
      name: 'Fecha de Nacimiento',
      selector: 'fechaNacimiento',
      sortable: true
    },
    {
      name: 'Clave de Elector',
      selector: 'claveElector',//
      sortable: true,
    },
    {
      name: 'Digitador',
      selector: 'digitador',//
      sortable: true,
    },
    {
      name: 'Botones',
      sortable: true,
      cell: id =>
        <div className="btn-group ">
          <button
            title="Editar"
            type="button"
            className="btn btn-warning"
            onClick={() => Editar(id)}
          >
            <i className="far fa-edit"></i>
          </button>
          {(auth.rol === 'Candidato' || auth.rol === 'Administrador') ?
            <>
              <button
                title="Eliminar"
                type="button"
                className="btn btn-danger "
                onClick={() => Eliminar(id.id)}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </> : <></>}
        </div>
    },

  ];
  const PagOptions = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }

  const Click = () => {
    (vista === 'Tabla') ? setVista('Tarjeta') : setVista('Tabla');
    scrollToBottomAnimated('scrollAnimated');
  }

  return (
    <div id="Tabla" className="me-5 ms-5 mb-5 mt-2" >
      {matches
        ?
        (vista === 'Tabla')
          ?
          <>
            <div className="row g-3 mb-1">
              <div className="col-3"><h3>Electores Registrados</h3></div>
              <div className="col-6">
                {(auth.rol === 'Candidato' || auth.rol === 'Administrador') ?
                  <>
                    <Reporte filtro={filtro} />
                  </> : <></>}
                <button
                  title="Cambiar Vista"
                  className="btn btn-primary ms-1"
                  type="button"
                  onClick={Click}
                ><i className="far fa-eye"></i></button>
                <VentanaModal votante={votante} setFiltro={setFiltro}/>
                <button
                  title="Actualizar tabla"
                  className="btn btn-primary ms-1"
                  type="button"
                  onClick={obtenerVotantes}
                ><i className="fas fa-sync"></i></button>
              </div>
              <div className="col-3">
                <Buscador votante={votante} setFiltro={setFiltro} />
              </div>
            </div>
            <DataTable
              columns={columnas}
              data={filtro}
              noHeader
              pagination
              paginationComponentOptions={PagOptions}
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
              striped
              highlightOnHover
              responsive
            />
          </>
          :
          <>
            <center><h2>Electores Registrados</h2></center>
            <br />
            <div className="row g-3 mb-1">
              <div className="col-4"></div>
              <div className="col-4">

                <Buscador votante={votante} setFiltro={setFiltro} />
                <hr />
                <center className="mb-1">
                  {(auth.rol === 'Candidato' || auth.rol === 'Administrador') ?
                    <>
                      <Reporte filtro={filtro} />
                    </> : <></>}
                  <button
                    title="Cambiar vista"
                    className="btn btn-primary ms-1 "
                    type="button"
                    onClick={Click}
                  ><i className="far fa-eye"></i></button>
                  <VentanaModal votante={votante} setFiltro={setFiltro} />
                  <button
                  title="Actualizar tabla"
                  className="btn btn-primary ms-1"
                  type="button"
                  onClick={obtenerVotantes}
                ><i className="fas fa-sync"></i></button>
                </center>

                <Pagination postsPerPage={postsPerPage} totalPosts={filtro.length} paginate={paginate} />
              </div>
              <div className="col-4" ></div>
            </div>
            <hr />
            <div className="row  mb-1" id='scrollAnimated' >
              <div className="d-flex">
                <VotantesCards filtroVotante={currentPosts} Eliminar={Eliminar} />
              </div>
            </div>
          </>
        :
        <>
          <center><h5>Electores Registrados</h5></center>
          <br />
          <div className="row g-3 mb-1">
            <div className="col-2"></div>
            <div className="col-8">
              <Buscador votante={votante} setFiltro={setFiltro} />
              <hr />
              <center className="mb-3">
                {(auth.rol === 'Candidato' || auth.rol === 'Administrador') ?
                  <>
                    <Reporte filtro={filtro} />
                  </> : <></>}
                <VentanaModal votante={votante} setFiltro={setFiltro}/>
                <button
                  title="Actualizar tabla"
                  className="btn btn-primary ms-1"
                  type="button"
                  onClick={obtenerVotantes}
                ><i className="fas fa-sync"></i></button>
              </center>

              <Pagination postsPerPage={postsPerPage} totalPosts={filtro.length} paginate={paginate} />
            </div>
            <div className="col-2"></div>
          </div>
          <hr />

          <VotantesCards filtroVotante={currentPosts} Eliminar={Eliminar} />

        </>
      }

    </div>
  )
}
