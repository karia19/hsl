import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import StationTable from "./stationTable";
import PieChart from "./pieChart";
import './station.css'

const Station = () => {
    const { name }  = useParams()
    const [ station, setStation ] = useState([])
    const [ popular, setPopular ] = useState([])
    const [ dataReady, setDataReady ] = useState(false)
    const [ error, setError ] = useState('')

    useEffect(() => {
        (async() => {
            try {
                const stationData = await axios.get(`http://localhost:3003/api/v1/jorneys/station?name=${name}`)
                const fivePopularStations = await axios.post('http://localhost:3003/api/v1/jorneys/fivePopularStations/', {name: name})
                console.log(stationData.data.data.length)
                setStation(stationData.data)
                setPopular(fivePopularStations.data)
                if (stationData.data.data.length !== 0){
                    setDataReady(true)
                } else {
                    setError("No data found check station name or ....")
                    setDataReady(true)
                }
            } catch(e){

            }
        })();
    }, [])

    const FiveStats = () => (
        <div className="five-stats">
        <div className="container" style={{ paddingTop: "30px", paddingBottom: "30px"}}>
        <div className="row" style={{ marginTop: "1.2rem"}}>
            <div className="col">
                <h2 >Top departure stations from {name}</h2>
            
                <table className='table table-md table-borderless'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Station</th>
                            <th scope='col'>Jorneys</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popular['departureStation'].map((x, index) => 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="station-link"><a href={`http://localhost:3000/station/${x.station}`}>{x.station}</a></td>
                                <td >{x.jorneyTotal}</td>
                                
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="col">
                <h2 >Top return stations to {name}</h2>
                            
                <table className='table table-md table-borderless'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Station</th>
                            <th scope='col'>Jorneys</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popular['retrunSatation'].map((x, index) => 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="station-link"><a href={`http://localhost:3000/station/${x.station}`}>{x.station}</a></td>
                                <td >{x.jorneyTotal}</td>
                                
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
        </div>
        </div>
    )

    return(
        <div className="station-back">
            <div className="station-flex">
                <h2 className="text-center station-title">{name}</h2>
                {dataReady ?
                    <div>
                        {error.length === 0 ?
                           <div>
                                <PieChart data={station} />
                                <br></br>
                                <StationTable  data={station} />
                                <br></br>
                                <FiveStats />
                            </div>
                        : 
                            <div  style={{ height: "100vh"}}>
                                <h3 className="text-center"  >{error}</h3>
                            </div>
                        
                        }
                       
                    </div>
                :
                    <div className="d-flex justify-content-center" style={{ height: "100vh", width: "100vw"}}>
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
