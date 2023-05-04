import React, { useState, useEffect, useMemo, Suspense } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
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
        zoom: 12,
       

    })

    useEffect(() => {
        (async() => {
            const resStations = await axios.get(URL_stations)
            //const modData = await ModStationData(resStations.data)
            setStationsData(resStations.data.data.filter(x => x['x'] !== undefined))
            console.log("filter", resStations.data.data.filter(x => x['x'] !== undefined))
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
    
    function Loading() {
        return ( 
          <div style={{ display:"flex", justifyContetnt: "center", alignItems: "center" , position: "relative"}} className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )
    }
    

    return(
        <>
        <Suspense fallback={<Loading />}>
        <Map
            {... viewport}
            onMove={evt => setViewPort(evt.viewState)}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} //"pk.eyJ1Ijoia2FyaWEyMDIzIiwiYSI6ImNsZ3JpZHh2czBuNDczcG1reDFrNWJpeXoifQ.xu3lRPVRcWM-MAmL3FCByw"
            style={{width: '100%', height: '100vh',  }}

            mapStyle="mapbox://styles/karia2023/clgxbaxd700cg01qy8i0u95fx"

        
             
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
                    <div className='pop-up-info'>
                        
                        <h3>{popUpInfo.Nimi}</h3>
                        
                        <p>Address: {popUpInfo.Osoite}</p>
                        <p>Bikes: {popUpInfo.Kapasiteet}</p>
                        <a
                            target="_new"
                            href={`http://localhost:3000/station/${popUpInfo.Nimi}`}
                        >
                            <button className='btn btn-outline-primary shadow-none'>More Details</button>
                        </a>
                     </div>
                       
                </Popup>
                )}
        
        
        </Map>
        </Suspense>
        </>
    )
}


export default TestMapp;