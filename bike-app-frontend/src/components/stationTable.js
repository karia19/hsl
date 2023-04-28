import React, { useState, useEffect } from 'react';
import './station.css'


const StationTable = (props) => {
    const [ stationList, setStationList ] = useState([]);
    const [ stationNumEnd, setStationNumEnd ] = useState(10)
    const [ stationNumStart, setStationNumStart ] = useState(0)
    console.log(props.data.data)
    
    useEffect(() => {
        setStationList(props.data.data.slice(stationNumStart,stationNumEnd))
    },[stationNumEnd])

    

    function ChangeLen(x, y){
        setStationNumStart(x)
        setStationNumEnd(y)
    }

    return(
        <div>
            
            <table className='table table-md table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Return</th>
                        <th scope='col'>Cov Distance</th>
                        <th scope='col'>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {stationList.map((x, index) => 
                        <tr key={index}>
                            <td>{x.Departure}</td>
                            <td >{x.ReturnStationName}</td>
                            <td>{Number(x.CoveredDistance) / 1000} km</td>
                            <td>{(Number(x.Duration) / 60).toFixed(2)} min</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group me-2" role="group" aria-label="First group">
                <button onClick={() => ChangeLen(0, 10)} type="button" class="btn btn-outline-secondary">1</button>
                <button onClick={() => ChangeLen(10, 20)} type="button" class="btn btn-outline-secondary">2</button>
                <button onClick={() => ChangeLen(20, 30)} type="button" class="btn btn-outline-secondary">3</button>
                <button onClick={() => ChangeLen(30, 40)} type="button" class="btn btn-outline-secondary">4</button>
                <button onClick={() => ChangeLen(40, 50)} type="button" class="btn btn-outline-secondary">5</button>
                <button  type="button" class="btn btn-dark">Load More Data</button>

            </div>
            </div>
        </div>
    )
}

export default StationTable