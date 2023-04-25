import React, { useState, useEffect, useMemo } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';

import maplibregl from 'maplibre-gl';
import Pin from './pin'
//import 'mapbox-gl/dist/mapbox-gl.css';
import Icon from '../images/map-marker.png'
import axios from 'axios';

import CITIES from '../data.json'


const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const URL_stations = 'http://localhost:3003/api/v1/stations'

const TestMapp = () => {
    const [ stationsData, setStationsData ] = useState([])
    const [ popUpInfo, setPopUpInfo ] = useState(null)
    const [ viewport, setViewPort ] = useState({
        longitude: 24.945831,
        latitude: 60.192059,
        zoom: 11,
        width: "100vh",
        height: "100vh"

    })

    useEffect(() => {
        (async() => {
            const resStations = await axios.get(URL_stations)
            //const modData = await ModStationData(resStations.data)
            setStationsData(resStations.data.data.filter(x => x['x'] != undefined))
            console.log("filter", resStations.data.data.filter(x => x['x'] != undefined))
            console.log("not filter", resStations.data.data)

        })();
    },[])  

    const pins = useMemo(
        () =>
          CITIES.map((city, index) => (
            <Marker
              key={city.ID}
              longitude={city.x}
              latitude={city.y}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setPopUpInfo(city);
              }}
            >
              <Pin />
            </Marker>
          )),
        []
      );
    
    
    

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
        {pins}
        {/*
            {CITIES.map((city) =>
            <Marker 
                longitude={city.x == NaN ? 0: city.x} 
                latitude={city.y == NaN ? 0: city.y} 
                anchor="bottom" >
                <Pin />
            </Marker>
            )}
         */}   
            {popUpInfo && (
                <Popup
                    anchor="top"
                    
                    longitude={popUpInfo.x}
                    latitude={popUpInfo.y}
                    
                    onClose={() => setPopUpInfo(null)}
                    >
                    <div  style={{ width: "auto"}}>
                        <h3>{popUpInfo.Osoite}</h3>
                        <p>Place: {popUpInfo.Nimi}</p>
                        <p>Bikes: {popUpInfo.Kapasiteet}</p>
                        <a
                            target="_new"
                            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=`}
                        >
                            <button className='btn  btn-outline-dark'>More Details</button>
                        </a>
                     </div>
                       
                </Popup>
                )}
        
        
        </Map>
        </>
    )
}


export default TestMapp;