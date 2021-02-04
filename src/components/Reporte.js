import React from 'react';
import ReactExport from "react-export-excel";


export const Reporte = ({filtro}) => {

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  
    return (
        <>
                <ExcelFile element={<button title="Reporte de Excel" type="button" className="btn btn-success"><i className="fas fa-file-excel"></i></button>} filename='Reporte Electores'>
                <ExcelSheet data={filtro} name='Electores Registrados'>
                  <ExcelColumn label='Nombre' value='nombre'  />
                  <ExcelColumn label='Domicilio' value='domicilio' />
                  <ExcelColumn label='Sexo' value='sexo' />
                  <ExcelColumn label='Fecha de Nacimiento' value='fechaNacimiento' />
                  <ExcelColumn label='Clave de Elector' value='claveElector' />
                  <ExcelColumn label='Registro' value='Registro' />
                  <ExcelColumn label='CURP' value='curp' />
                  <ExcelColumn label='Estado' value='estado' />
                  <ExcelColumn label='Localidad' value='localidad' />
                  <ExcelColumn label='Municipio' value='municipio' />
                  <ExcelColumn label='Seccion' value='seccion' />
                  <ExcelColumn label='Fecha de Emisión' value='emision' />
                  <ExcelColumn label='Vigencia' value='vigencia' />
                  <ExcelColumn label='¿Qué quieres para ti?' value='preguntaUno' />
                  <ExcelColumn label='¿Qué quieres para tu colonia?' value='preguntaDos' />
                  <ExcelColumn label='¿Qué quieres para tu pueblo o ciudad?' value='preguntaTres' />
                  <ExcelColumn label='Voto' value='voto' />
                  <ExcelColumn label='Digitador' value='digitador' />
                </ExcelSheet>
              </ExcelFile>
        </>
    )
}
