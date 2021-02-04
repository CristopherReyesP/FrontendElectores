import { useCallback, useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';
import { AuthContext } from '../auth/AuthContext';
import { SocketContext } from '../context/SocketContext';
import { fetchConToken } from '../helpers/fetch';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc3RwaGVycmV5ZXMiLCJhIjoiY2trYndiMXp2MDNvcTJ3cGk2dHhjd3Z6biJ9.JkrRc5g8_MhRw0P-_HIOKA';

export const useMapbox = (puntoInicial) => {
    //Usuario logged
    const { auth } = useContext(AuthContext);
    const { socket } = useContext( SocketContext );

    //Referencia al DIV del mapa
    const mapaDiv = useRef();
    const setRef = useCallback((node) => {
        mapaDiv.current = node;
    }, []);

    //Referencia a los marcadores
    const marcadores = useRef({});
    //Mapa y coords
    const mapa= useRef();

    //funcion para agregar marcadores
    const agregarMarcador = useCallback((ev)=>{
        const { lng, lat } = ev.lngLat;
        const marker = new mapboxgl.Marker();
        marker.id = v4();

        marker
        .setLngLat([ lng, lat])
        .addTo( mapa.current )

        marcadores.current[ marker.id ] = marker;
        socket.emit('marcador-nuevo',{
            idMarcador: marker.id, 
            longitud: lng, 
            latitud: lat, 
            usuario: auth.uid, 
            rol: auth.rol});
    },[auth, socket])

    useEffect(() => {    
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ puntoInicial.lng, puntoInicial.lat ],
            zoom: puntoInicial.zoom
        });
        mapa.current = map;
    }, [puntoInicial]);

    //Agregar marcadores cuando hago click
    useEffect(() => {
        mapa.current?.on('click', agregarMarcador);
    }, [agregarMarcador]);
    //obtiene marcadores almacenados en el context
    useEffect(() => {
        const obtenerMarcadores = async () => {
        const data = Object.values(await fetchConToken(`marcadores/${auth.uid}`));
        if (Object.keys(data).length === 0) {
            return
        } else {
                data.forEach( (markr) => {
                    let marker = new mapboxgl.Marker();
                    marker
                    .setLngLat([ markr.longitud, markr.latitud ])
                    .addTo( mapa.current )
                })
        }
    }
    obtenerMarcadores();
    }, [auth]);

    return{
        agregarMarcador,
        marcadores,
        setRef
    }
}
