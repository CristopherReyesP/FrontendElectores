import React, {  useState } from 'react';
import { createContext } from 'react';

export const VotanteContext = createContext();

const initialState = {
    _id: '',
    nombre: '',
    domicilio: '', 
    sexo: '', 
    fechaNacimiento: '', 
    claveElector: '',
    Registro: '', 
    curp:'', 
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
}


export const VotanteProvider = ({ children }) => {
   
    const [elector, setElector] = useState(initialState)
   
   const registrarElector = (votante) => {
        setElector(votante);
   }
    
    return (
        <VotanteContext.Provider  value={{ 
            elector, 
            registrarElector,  
            }}>
        {children}
        </VotanteContext.Provider>

    )
}
