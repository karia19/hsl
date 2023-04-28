import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import StationTable from "./stationTable";
import './station.css'

const Station = () => {
    const { name }  = useParams()
    const [ station, setStation ] = useState([])
    const [ popular, setPopular ] = useState([])
    const [ dataReady, setDataReady ] = useState(false)
    useEffect(() => {
        (async() => {
            try {
                const stationData = await axios.get(`http://localhost:3003/api/v1/jorneys/station?name=${name}`)
                const fivePopularStations = await axios.post('http://localhost:3003/api/v1/jorneys/fivePopularStations/', {name: name})
                console.log(fivePopularStations, stationData)
                setStation(stationData.data)
                if (stationData.lenght != 0){
                    setDataReady(true)
                }
            } catch(e){

            }
        })();
    }, [])

    return(
        <div>
            <div className="container station-flex">
                <h2 className="text-center station-title">{name}</h2>
                {dataReady ?
                    
                    <StationTable data={station} />
                :
                    <div className="d-flex justify-content-center">
                        <div class="spinner-border " role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                }
            </div>
            
        </div>
    )
}

export default Station;