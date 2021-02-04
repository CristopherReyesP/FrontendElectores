import React, { useState, useContext } from 'react';
import { Alert } from 'reactstrap';
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthContext';
import { SocketContext } from '../context/SocketContext';
import InputFecha from './InputFecha';


export const FormVotantes = () => {

  const { auth } = useContext(AuthContext);
  const { socket, votanteEditado } = useContext(SocketContext);
  const [votante, setVotante] = useState({
    nombre: '',
    domicilio: '',
    sexo: '',
    fechaNacimiento: '',
    claveElector: '',
    Registro: '',
    curp: '',
    estado: '',
    localidad: '',
    municipio: '',
    seccion: '',
    emision: '',
    vigencia: '',
    digitador: '',
    candidato: '',
    preguntaUno: '',
    preguntaDos: '',
    preguntaTres: '',
    voto: ''
  });

  const onChange = ({ target }) => {
    const { name, value } = target;
    setVotante({
      ...votante,
      [name]: value
    });
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    socket.emit('Datos-Votante', {
      nombre: votante.nombre,
      domicilio: votante.domicilio,
      sexo: votante.sexo,
      fechaNacimiento: votante.fechaNacimiento,
      claveElector: votante.claveElector,
      Registro: votante.Registro,
      curp: votante.curp,
      estado: votante.estado,
      localidad: votante.localidad,
      municipio: votante.municipio,
      seccion: votante.seccion,
      emision: votante.emision,
      vigencia: votante.vigencia,
      digitador: auth.uid,
      candidato: auth.vinculo,
      preguntaUno: votante.preguntaUno,
      preguntaDos: votante.preguntaDos,
      preguntaTres: votante.preguntaTres,
      voto: votante.voto
    });

    if (votanteEditado === false) {
      Swal.fire('Error', 'Debe llear todos los campos correctamente, si el problema continua comuniquese con el administrador', 'error');
    } else {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registrado',
        showConfirmButton: false,
        timer: 1500
      })
    }
    setVotante({
      nombre: '',
      domicilio: '',
      sexo: '',
      fechaNacimiento: '',
      claveElector: '',
      Registro: '',
      curp: '',
      estado: '',
      localidad: '',
      municipio: '',
      seccion: '',
      emision: '',
      vigencia: '',
      preguntaUno: '',
      preguntaDos: '',
      preguntaTres: '',
      voto: ''
    });


  }
  const todoOk = () => {
    return (
      votante.nombre.length > 0 &&
      votante.domicilio.length > 0 &&
      votante.fechaNacimiento.length > 0 &&
      votante.sexo.length > 0 &&
      votante.claveElector.length > 0 &&
      votante.Registro.length > 0 &&
      votante.curp.length > 0 &&
      votante.estado.length > 0 &&
      votante.municipio.length > 0 &&
      votante.localidad.length > 0 &&
      votante.seccion.length > 0 &&
      votante.emision.length > 0 &&
      votante.vigencia.length > 0 &&
      votante.preguntaUno.length    > 0 &&
      votante.preguntaDos.length > 0 &&
      votante.preguntaTres.length > 0 &&
      votante.voto.length > 0 
    ) ? true : false;
  }

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Registro de Electores</h2>
      </div>
      <div className='row'>
      <div className="col-md-12 col-lg-2 p-3"></div>
      <div className="col-md-12 col-lg-8 p-3">
        <form
          onSubmit={onSubmit}
          className="needs-validation" >
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label">Fecha de Nacimiento</label>
              <div className="border border-2 p-2 rounded-3">
                <InputFecha setVotante={setVotante} votante={votante} />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="form-label">Sexo</label>
              <select
                border='none'
                type="select"
                className="form-control border border-2 p-2 rounded-3"
                name="sexo"
                placeholder="Femenino - Masculino"
                value={votante.sexo}
                onChange={onChange}
                required >
                <option hidden value="">Sexo</option>
                <option value='Masculino'>Masculino</option>
                <option value='Femenino'>Femenino</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label"  >Nombre</label>
              <input
                // pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="nombre"
                placeholder=""
                required
                value={votante.nombre}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Domicilio</label>
              <input
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="domicilio"
                placeholder=" C. Hidalgo Norte ..."
                required
                value={votante.domicilio}
                onChange={onChange}
              />
            </div>



            <div className="col-sm-6">
              <label className="form-label">Clave de Elector</label>
              <input
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="claveElector"
                placeholder=""
                required
                value={votante.claveElector}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Año de Registro</label>
              <input
                pattern="[0-9]+"
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="Registro"
                placeholder="Ej. 2020"
                required
                value={votante.Registro}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">CURP</label>
              <input
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="curp"
                placeholder=""
                required
                value={votante.curp}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Estado</label>
              <input
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="estado"
                placeholder="Ej. 21"
                required
                value={votante.estado}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Municipio</label>
              <input
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="municipio"
                placeholder="Ej. 010"
                required
                value={votante.municipio}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Localidad</label>
              <input
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="localidad"
                placeholder="Ej. 0001"
                required
                value={votante.localidad}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Seccion</label>
              <input
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="seccion"
                placeholder="Ej. 0081"
                required
                value={votante.seccion}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Emisión</label>
              <input
                 pattern="[0-9]+"
                type="text"
                className="form-control border border-2 p-2 rounded-3"
                name="emision"
                placeholder="Ej. 2020"
                required
                value={votante.emision}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Vigencia</label>
              <input
                type="text"
                pattern="[0-9]+"
                className="form-control border border-2 p-2 rounded-3"
                name="vigencia"
                placeholder="Ej. 2024"
                required
                value={votante.vigencia}
                onChange={onChange}
              />
            </div>
            <hr className="my-4" />
            <h3>Encuesta</h3>
            <div className="col-sm-12">
              <label className="form-label">¿Qué quieres para ti?</label>
              <textarea
                // pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
                className="form-control border border-2 p-2 rounded-3"
                name="preguntaUno"
                required
                value={votante.preguntaUno}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-12">
              <label className="form-label">¿Qué quieres para tu colonia?</label>
              <textarea
                // pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
                className="form-control border border-2 p-2 rounded-3"
                name="preguntaDos"
                required
                value={votante.preguntaDos}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-12">
              <label className="form-label">¿Qué quieres para tu pueblo o ciudad?</label>
              <textarea
                // pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
                className="form-control border border-2 p-2 rounded-3"
                name="preguntaTres"
                required
                value={votante.preguntaTres}
                onChange={onChange}
              />
            </div>

            <div className="col-sm-3 col-3">
              <label className="form-label">Voto:</label>
              <select
                border='none'
                type="select"
                className="form-control border border-2 p-2 rounded-3"
                name="voto"
                placeholder="Femenino - Masculino"
                value={votante.voto}
                onChange={onChange}
                required >
                <option hidden value="">si o no</option>
                <option value='Si'>Si</option>
                <option value='No'>No</option>
              </select>
            </div>

            <hr className="my-4" />

            <Alert color="warning" hidden={todoOk()}>
            <i className="fas fa-exclamation-triangle">
            </i> Importante: No debe dejar ningún campo vacío o incorrecto.
           </Alert>
            <button
              className="w-100 btn btn-outline-success btn-lg"
              type="submit"
              disabled={!todoOk()}
            >
              Guardar
                </button>

          </div>
        </form>
      </div>
      <div className="col-md-12 col-lg-2 p-3"></div>
      </div>
    </div>


  )
}
