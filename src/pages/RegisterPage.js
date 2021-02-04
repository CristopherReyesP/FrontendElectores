import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { fetchSinToken } from '../helpers/fetch';
import { Nav } from '../components/Nav';
// import '../css/login-register.css';
import Swal from 'sweetalert2';

export const RegisterPage = () => {

    const [us, setUs] = useState([]);
    const { register, auth } = useContext(AuthContext);
    const [form, setForm] = useState({
        nombre: '',
        password: '',
        rol: '',
        email: '',
        vinculo: ''
    });
    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }
    const onSubmit = async (ev) => {
        ev.preventDefault();
        // llamar backend
        const { email, password, nombre, rol, vinculo } = form;
        const ok = await register(email, password, nombre, rol, vinculo);
        if (!ok) {
            Swal.fire('Error', 'Debe llear todos los campos correctamente', 'error');
        } else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registrado',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const todoOk = () => {
        return (
            form.email.length > 0 &&
            form.password.length > 0 &&
            form.nombre.length > 0 &&
            form.rol.length > 0 &&
            form.vinculo.length > 0
        ) ? true : false;
    }


    const obtenerCandidatos = async () => {
        const resp = await fetchSinToken('usuarios/Candidato', '', 'GET');
        const data = Object.values(resp);
        setUs(data);
    }


    useEffect(() => {
        obtenerCandidatos();
    }, [])

    const verificarRol = (Roles) => {
        if (Roles === 'Digitador') {
            if (auth.rol === 'Administrador') {
                return (
                    us.map(usr => (
                        <option
                            value={usr.uid}
                            key={usr.uid}
                        >
                            {usr.nombre}
                        </option>
                    ))
                )
            } else {
                return (
                    <>
                        <option
                            value={auth.uid}
                            key={auth.uid}
                        >
                            {auth.name}
                        </option>
                    </>
                )
            }
        } else {
            return <option value='No-aplica'>No-aplica</option>
        }
    }

    return (

        <>
            <Nav />
            <div className='row width-100'>
                <div className='col-1 col-sm-4 mb-5'></div>
                <div className='col-10 col-sm-4 mb-5'>
                    <form
                        className="login100-form validate-form flex-sb flex-w"
                        onSubmit={onSubmit}
                    >
                        <span className="login100-form-title mb-3 mt-5">
                            Registrar Usuarios
					</span>

                        <div className="wrap-input100 validate-input mb-3">
                            <input
                                className="input100"
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={form.nombre}
                                onChange={onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input mb-3">
                            <input
                                className="input100"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>


                        <div className="wrap-input100 validate-input mb-3">
                            <input
                                className="input100"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={onChange}
                            />
                            <span className="focus-input100"></span>
                        </div>
                        <div
                            className="wrap-input100 validate-input mb-3" >
                            <select
                                className="input100"
                                name="rol"
                                value={form.rol}
                                onChange={onChange}
                            >
                                <option hidden value="">Rol</option>
                                {(auth.rol === 'Administrador') ?
                                    <>
                                        <option value="Candidato">Candidato</option>
                                        <option value="Administrador">Administrador</option>
                                    </> : <></>}
                                <option value="Digitador">Digitador</option>
                            </select>
                            <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100 validate-input mb-3">
                            <select
                                onClick={obtenerCandidatos}
                                className="input100"
                                name="vinculo"
                                value={form.vinculo}
                                onChange={onChange}
                            >
                                <option hidden value="">Vínculo</option>
                                {verificarRol(form.rol)}
                            </select>
                            <span className="focus-input100"></span>
                        </div>


                        <div className="">
                            <button
                                type='submit'
                                className="login100-form-btn"
                                disabled={!todoOk()}
                            >
                                Crear cuenta
						</button>
                        </div>

                    </form>
                </div>
                <div className='col-1 col-sm-4 mb-5'></div>
            </div>
        </>
    )
}
