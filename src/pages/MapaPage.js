import React from 'react';
import { useMapbox } from '../hooks/useMapbox';
import { Nav } from '../components/Nav';
import '../css/mapa.css';


const puntoInicial = {
    lng: -98.20,
    lat: 19.023,
    zoom: 10
}
export const MapaPage = () => {

    const { setRef } = useMapbox(puntoInicial);
    
    return (
        <>
            <Nav/>
            <div 
            ref={ setRef }
            className='mapContainer' 
            />    
        </>
    )
}
