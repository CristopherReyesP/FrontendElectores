import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { VotanteContext } from '../context/VotanteContext';


export const VotantesCards = ({ filtroVotante, Eliminar }) => {
    const history = useHistory();
    const { registrarElector } = useContext(VotanteContext);
    const { auth } = useContext(AuthContext);
    const cardStyle = {
        animationDuration: '1.5s',
        width: '12rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '2px 2px 12px #999'
    }
    const textStyle = {
        fontWeight: 'bold'
    }
    const Editar = async (id) => {
        await registrarElector(id);
        history.push('/Edit');
    }

    return (
        filtroVotante.map((vt) => (

            <div className="card border-info border-1 mb-4 animate__animated animate__bounceInLeft" key={vt.id} style={cardStyle}>
                <div className="card-body" >
                    <p style={textStyle}>Nombre:</p>
                    <p >{vt.nombre}</p>
                    <p style={textStyle}>Fecha de Nacimiento:</p>
                    <p >{vt.fechaNacimiento}</p>
                    <p style={textStyle}>Sexo:</p>
                    <p  >{vt.sexo}</p>
                    <p style={textStyle}>Domicilio:</p>
                    <p  >{vt.domicilio}</p>
                    <p style={textStyle}>Clave de Elector:</p>
                    <p  >{vt.claveElector}</p>
                    <p style={textStyle}>CURP: </p>
                    <p >{vt.curp}</p>
                    <p style={textStyle}>Estado: </p>
                    <p >{vt.estado}</p>
                    <p style={textStyle}>Localidad: </p>
                    <p >{vt.localidad}</p>
                    <p style={textStyle}>Municipio: </p>
                    <p >{vt.municipio}</p>
                    <p style={textStyle}>Año de Emisión: </p>
                    <p >{vt.emision}</p>
                    <p style={textStyle}>Seccion: </p>
                    <p >{vt.seccion}</p>
                    <p style={textStyle}>Año de Registro: </p>
                    <p >{vt.Registro}</p>
                    <p style={textStyle}>Vigencia: </p>
                    <p >{vt.vigencia}</p>
                    <p style={textStyle}>Digitador: </p>
                    <p >{vt.digitador}</p>
                    <p style={textStyle}>¿Qué quieres para ti?</p>
                    <p >{vt.preguntaUno}</p>
                    <p style={textStyle}>¿Qué quieres para tu colonia?</p>
                    <p >{vt.preguntaDos}</p>
                    <p style={textStyle}>¿Qué quieres para tu pueblo o ciudad?</p>
                    <p >{vt.preguntaTres}</p>
                    <p style={textStyle}>Voto: </p>
                    <p >{vt.voto}</p>

                    <center>
                        <div className="btn-group ">
                            <button
                                title="Editar"
                                type="button"
                                className="btn btn-warning"
                                onClick={e => Editar(vt)}
                            >
                                <i className="far fa-edit"></i>
                            </button>
                            {(auth.rol === 'Candidato' || auth.rol === 'Administrador') ?
                                <>
                                    <button
                                        title="Eliminar"
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={e => Eliminar(vt.id)}
                                    >
                                        <i className="far fa-trash-alt"></i>
                                    </button>
                                </> : <></>}
                        </div>
                    </center>
                </div>
            </div>



        ))
    )
}
