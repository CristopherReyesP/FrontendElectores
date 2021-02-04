import React, { useEffect, useState, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { Buscador } from '../components/Buscador';
import { fetchConToken } from '../helpers/fetch';
import { Nav } from '../components/Nav';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';

export const EditarUsuarios = () => {
    const { EditarSinEncriptar, EditarYEncriptar } = useContext(AuthContext);
    const [filtro, setFiltro] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [compare, setCompare] = useState({
        email: '',
        nombre: '',
    });
    const [form, setForm] = useState({
        email: '',
        nombre: '',
        rol: '',
        uid: '',
        vinculo: '',
        password: '',
    });

    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }
    useEffect(() => {
        const InicialUsuarios = async () => {
            const data = Object.values(await fetchConToken(`usuarios/todoslos/usuarios`));
            setUsuarios(data);
        }
        InicialUsuarios();
    }, [compare]);

    const Editar = async (id) => {
        setCompare({
            email: id.email,
            password: id.password,
        })
        setForm(id);
    }

    const Guardar = async () => {
        if (form.password !== compare.password && form.email !== compare.email) {
            //Usar funcion que encripta contraseña
            const { email, password, nombre, rol, vinculo, uid } = form;
            const ok = await EditarYEncriptar(email, password, nombre, rol, vinculo, uid);
            //cambiar los estados a vacio
            setCompare({
                email: '',
                password: '',
            })
            setForm({
                email: '',
                nombre: '',
                rol: '',
                uid: '',
                vinculo: '',
                password: '',
            });
            //Swalert que diga que email y password fueron cambiados
            if (!ok) {
                Swal.fire('Error', 'Intentelo de nuevo, si el problema continua comuníquese con el desarrollador', 'error');
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Email y password cambiados',
                    showConfirmButton: true,
                    timer: 1500
                })
            }
        }
        else if (form.password !== compare.password) {
            //usar funcion que encripta contraseña
            const { email, password, nombre, rol, vinculo, uid } = form;
            const ok = await EditarYEncriptar(email, password, nombre, rol, vinculo, uid);
            //cambiar los estados a vacio
            setCompare({
                email: '',
                password: '',
            })
            setForm({
                email: '',
                nombre: '',
                rol: '',
                uid: '',
                vinculo: '',
                password: '',
            });
            //swalert que diga que password fue cambiado
            if (!ok) {
                Swal.fire('Error', 'Intentelo de nuevo, si el problema continua comuníquese con el desarrollador', 'error');
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password cambiado',
                    showConfirmButton: true,
                    timer: 1500
                })
            }
        }
        else if (form.email !== compare.email) {
            //Usar funcion que no encripta contraseña
            const { email, password, nombre, rol, vinculo, uid } = form;
            const ok = await EditarSinEncriptar(email, password, nombre, rol, vinculo, uid);
            //cambiar los estados a vacio
            setCompare({
                email: '',
                password: '',
            });
            setForm({
                email: '',
                nombre: '',
                online: '',
                rol: '',
                uid: '',
                vinculo: '',
                password: '',
            });
            //swalert que diga que email fue cambiado
            if (!ok) {
                Swal.fire('Error', 'El email debe terminar en .com, intentelo de nuevo, si el problema continua comuniquese con el desarrollador', 'error');
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Email cambiado',
                    showConfirmButton: true,
                    timer: 1500
                })
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha detectado ningun cambio',
            })

            
        }
    }
    /*     const Eliminar = async (id) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Registro eliminado',
                showConfirmButton: false,
                timer: 1500
            })
            // await socket.emit('Eliminar', id);
            // await obtenerVotantes();
        }
     */
    const columnas = [
        {
            name: 'Botones',
            sortable: true,
            cell: id =>
                <div className="btn-group-vertical ">
                    <button
                        title="Editar"
                        type="button"
                        className="btn btn-warning mt-1"
                        onClick={e => Editar(id)}
                    >
                        <i className="far fa-edit"></i>
                    </button>
                    {/* <button
                        title="Eliminar"
                        type="button"
                        className="btn btn-danger mb-1"
                        onClick={e => Eliminar(id.id)}
                    >
                        <i className="far fa-trash-alt"></i>
                    </button> */}
                </div>
        },
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true
        },
        {
            name: 'Contraseña',
            sortable: true,
            cell: () => '****************'
        },


    ];
    const todoOk = () => {
        return (
            form.email.length > 0 &&
            form.password.length > 0 &&
            form.nombre.length > 0
        ) ? true : false;
    }
    const PagOptions = {
        rowsPerPageText: 'Filas por Página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    }
    return (
        <div>
            <Nav />
            <div className='row width-100'>
                <div className='col-sm-4 col-1 '></div>
                <div className='col-sm-4 col-10 mt-5 border-bottom'>
                    <center>
                        <h3>Editar Usuario</h3>

                    </center>
                    <hr />
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
                   <center> <div className="">
                            <button
                                type='submit'
                                className="btn btn-outline-primary mt-2 mb-3"
                                disabled={!todoOk()}
                                onClick={() => Guardar()}
                            >
                                Guardar Cambios
    						</button>
                        </div></center>
                </div>
                <div className='col-sm-4 col-1'></div>
            </div>

            <div className='row width-100 mt-5'>
                <div className='col-2'></div>
                <div className='col-4'><h3>Usuarios:</h3></div>
                <div className='col-4'>
                    <Buscador votante={usuarios} setFiltro={setFiltro} />
                </div>
                <div className='col-2'></div>
            </div>
            <div className='row width-100'>
                <div className='col-2'></div>
                <div className='col-8 mt-1'>
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
                </div>
                <div className='col-2'></div>
            </div>
        </div>
    )
}
