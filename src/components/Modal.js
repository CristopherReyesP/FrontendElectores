import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Input, Label } from 'reactstrap';


export const VentanaModal = ({ votante, setFiltro }) => {
    const [abierto, setAbierto] = useState(false);
   
    const [form, setForm] = useState({
        sexo: '',
        seccion: '',
        municipio: '',
        estado: '',
        digitador: ''
    });
    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }


    const secciones = new Set();
    const municipios = new Set();
    const estados = new Set();
    const digitadores = new Set();
    
    votante.forEach(e => {
        secciones.add(e.seccion);
        municipios.add(e.municipio);
        estados.add(e.estado);
        digitadores.add(e.digitador);
        
    });
    const section = [...secciones];
    const mun = [...municipios];
    const est = [...estados];
    const digit = [...digitadores];
    
    const asignarDigitadores = () => {
        return (
            digit.map((sec, i) =>
            (<option
                value={sec}
                key={i}
                >
                {sec}
            </option>)
            ))
        }
        
        const asignarSecciones = () => {
            return (
                section.map((sec, i) =>
                (<option
                    value={sec}
                    key={i}
                    >
                {sec}
            </option>)
            ))
        }
        const asignarEstados = () => {
            return (
                est.map((es, i) =>
                (<option
                    value={es}
                    key={i}
                    >
                {es}
            </option>)
            ))
        }
        
        const asignarMunicipios = () => {
            return (
                mun.map((sec, i) =>
                (<option
                    value={sec}
                    key={i}
                    >
                {sec}
            </option>)
            ))
        }
        
        const abrirModal = () => {
            setAbierto(!abierto);
        }
        
        const Filtrar = () => {
            let elemento = [...votante];
            if (form.estado === '') {
                console.log('campo estado vacio')
            } else {
                let e = votante.filter(es => es.estado === form.estado);
                elemento = [...e];
            }
            if (form.municipio === '') {
                console.log('campo municipio vacio')
            } else {
                let e = elemento.filter(mu => mu.municipio === form.municipio);
                elemento = [...e];
            }
            if (form.seccion === '') {
                console.log('campo seccion vacio')
            } else {
                let e = elemento.filter(scc => scc.seccion === form.seccion);
                elemento = [...e];
            }
            if (form.sexo === '') {
                console.log('campo sexo vacio');
            } else {
                let e = elemento.filter(sx => sx.sexo === form.sexo);
                elemento = [...e];
            }
            if (form.digitador === '') {
                console.log('campo digitador vacio');
            } else {
                let e = elemento.filter(dig => dig.digitador === form.digitador);
                elemento = [...e];
            }
            setFiltro(elemento);
            setForm({
                sexo: '',
                seccion: '',
                municipio: '',
                estado: '',
                digitador: ''
            });
            setAbierto(!abierto);
        }
        
        const modalStyles = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '50%'
            
        }
    return (
        <>
            <Button
                title='Filtrar'
                color='primary ms-1'
                onClick={() => abrirModal()}
            ><i className="fas fa-filter"></i></Button>
            <Modal isOpen={abierto} style={modalStyles}>
                <ModalHeader>
                    Filtrar
            </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exampleSelect">Sexo</Label>
                        <Input
                            type="select"
                            id="exampleSelect"
                            name="sexo"
                            value={form.sexo}
                            onChange={onChange}
                        >
                            <option hidden value="">Sexo</option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Sección</Label>
                        <Input
                            type="select"
                            id="exampleSelect"
                            name="seccion"
                            value={form.seccion}
                            onChange={onChange}
                        >
                            <option hidden value="">Sección</option>
                            {asignarSecciones()}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Municipio</Label>
                        <Input
                            type="select"
                            id="exampleSelect"
                            name="municipio"
                            value={form.municipio}
                            onChange={onChange}
                        >
                            <option hidden value="">Municipios</option>
                            {asignarMunicipios()}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Estado</Label>
                        <Input
                            type="select"
                            id="exampleSelect"
                            name="estado"
                            value={form.estado}
                            onChange={onChange}
                        >
                            <option hidden value="">Estados</option>
                            {asignarEstados()}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Digitador</Label>
                        <Input
                            type="select"
                            id="exampleSelect"
                            name="digitador"
                            value={form.digitador}
                            onChange={onChange}
                        >
                            <option hidden value="">Digitadores</option>
                            {asignarDigitadores()}
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        title='Cerrar'
                        color='secondary ms-1'
                        onClick={() => abrirModal()}
                    >
                        Cerrar
                     </Button>
                    <Button
                        title='Filtrar'
                        color='primary ms-1'
                        onClick={Filtrar}
                    ><i className="fas fa-filter"></i>Aplicar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
