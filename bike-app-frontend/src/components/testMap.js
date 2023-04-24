import React, { useState, useEffect } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';

import maplibregl from 'maplibre-gl';
import Pin from './pin'
//import 'mapbox-gl/dist/mapbox-gl.css';
import Icon from '../images/map-marker.png'
import axios from 'axios';


const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';


export function TestMapp () {
    const [ popUpInfo, setPopUpInfo ] = useState(null)
    const [viewport, setViewPort ] = useState({
        longitude: 24.945831,
        latitude: 60.192059,
        zoom: 11,
        width: "100vh",
        height: "100vh"

    })


    return(
        <>
        <Map
            {... viewport}
            onMove={evt => setViewPort(evt.viewState)}
            mapboxAccessToken="pk.eyJ1Ijoia2FyaWEyMDIzIiwiYSI6ImNsZ3JpZHh2czBuNDczcG1reDFrNWJpeXoifQ.xu3lRPVRcWM-MAmL3FCByw"
            style={{width: '100vw', height: '100vh'}}

            mapStyle={MAP_STYLE}
            mapLib={maplibregl}

        
             
        >
        <Marker
            key={1}
            longitude={24.805825}
            latitude={60.176168}
            anchor="bottom"
            onClick={e => {
                e.originalEvent.stopPropagation();
                setPopUpInfo("hello");
            }}
          
            >
            <Pin />
            {popUpInfo && (
                <Popup
                    anchor="top"
                    
                    //longitude={Number(popupInfo.longitude)}
                    //latitude={Number(popupInfo.latitude)}
                    
                    onClose={() => setPopUpInfo(null)}
                    >
                    <div>
                    {/*{popupInfo.city}, {popupInfo.state} |{' '}*/}
                    <a
                        target="_new"
                        href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=`}
                    >
                        Wikipedia
                    </a>
                    </div>
                    <img width="100%" />
                </Popup>
                )}
        </Marker>
        
        </Map>
        </>
    )
}


export default TestMapp;