 import React, { useEffect, useState } from 'react'

export const Buscador = ({votante, setFiltro}) => {
    const [inputValue, setInputValue] = useState('');

    const onChange = ({ target }) => {
        const { value } = target;
        setInputValue(value);
      }

      useEffect(() => {
        const filtrar = () => {

            const vt = votante.filter((obj) => {
              var flag = false;
              Object.values(obj).forEach((val) => {
                if (String(val).indexOf(inputValue) > -1) {
                  flag = true;
                  return;
                }//si incluye el valor del inputValue flag es verdadero y si flag es verdadero regresa el filtro(obj)    
              });
              if (flag) return obj;
              return false;
            });
            setFiltro(vt); 
        }
          filtrar();
      
      }, [votante, inputValue, setFiltro]);

    return (
        <input
        type="text"
        className="form-control"
        placeholder="Buscar"
        value={inputValue}
        onChange={onChange}
      />
    )
}
