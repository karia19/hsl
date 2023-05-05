import React, { useState, useEffect, useMemo, Suspense } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import Pin from './pin'
import { ModStationData } from '../services/stationData';
//import 'mapbox-gl/dist/mapbox-gl.css';
import Icon from '../images/map-marker.png'
import axios from 'axios';

import CITIES from '../data.json'


const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const URL_stations = 'http://localhost:3003/api/v1/stations'

const TestMapp = () => {
    const [ stationsData, setStationsData ] = useState([])
    const [ dataReady, setDataReady ] = useState(false)
    const [ popUpInfo, setPopUpInfo ] = useState(null)
    const [ viewport, setViewPort ] = useState({
        longitude: 24.945831,
        latitude: 60.192059,
        zoom: 12,
       

    })

    useEffect(() => {
        (async() => {
          try {
            const resStations = await axios.get(URL_stations)
            
            if (resStations.data.data.length > 0) {
              const modData = await ModStationData(resStations.data)
              setStationsData(modData.filter(x => x['x'] !== undefined ||  x['y'] !== undefined))
              setDataReady(true)
  
            }
          } catch(e){
            console.log("error", e)
           
          }
        })();
    },[])  
   
    const pins = useMemo(
        () =>
          stationsData.map((city, index) => (
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
              <Pin color={city.Color} />
            </Marker>
          )),
        
      );
    
    function Loading() {
        return ( 
          <div style={{ display:"flex", justifyContetnt: "center", alignItems: "center" , position: "relative"}} className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )
    }
    

    return(
        <div className='map-main'>
        <Suspense fallback={<Loading />}>
        <Map
            {... viewport}
            onMove={evt => setViewPort(evt.viewState)}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} //"pk.eyJ1Ijoia2FyaWEyMDIzIiwiYSI6ImNsZ3JpZHh2czBuNDczcG1reDFrNWJpeXoifQ.xu3lRPVRcWM-MAmL3FCByw"
            style={{width: '100%', height: '110vh',  }}

            mapStyle="mapbox://styles/karia2023/clgxbaxd700cg01qy8i0u95fx"

        
             
        >
        {pins}  
            {popUpInfo && (
                <Popup
                    anchor="top"
                    
                    longitude={popUpInfo.x}
                    latitude={popUpInfo.y}
                    
                    onClose={() => setPopUpInfo(null)}
                    >
                    <div className='pop-up-info'>
                        
                        <h3>{popUpInfo.Name}</h3>
                        
                        <p>Address: {popUpInfo.Adress}</p>
                        <p>{popUpInfo.Kaupunki}</p>
                        <p>Bikes: {popUpInfo.Kapasiteetti}</p>
                        <a
                            target="_new"
                            href={`http://localhost:3000/station/${popUpInfo.Name}`}
                        >
                            <button className='btn btn-outline-primary shadow-none'>More Details</button>
                        </a>
                     </div>
                       
                </Popup>
                )}
        
        
        </Map>
        </Suspense>
        </div>
    )
}


export default TestMapp;