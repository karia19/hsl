import React, { useState, useEffect } from 'react';
import './station.css'
import axios from 'axios';

const StationTable = ( props ) => {
    const [ stationList, setStationList ] = useState([]);
    const [ name, setName ] = useState('');
    const [ pagnationList, setPagnationList ] = useState([]);
    const [ stationNumEnd, setStationNumEnd ] = useState(10);
    const [ stationNumStart, setStationNumStart ] = useState(0);
    const [ searchPage, setSearchPage ] = useState(0);
    const [ message, setMessage ] = useState('');

 
    

    useEffect(() => {
        try {
            setName(props.data.data[0]['DepartureStationName'])
        
            if (searchPage === 0){
                setStationList(props.data.data.slice(stationNumStart,stationNumEnd))
            } else {
                setStationList(pagnationList.slice(stationNumStart, stationNumEnd))
            }
        } catch(err){
            setMessage("No data ......")
        
        }
        
    },[stationNumEnd])

    function sortStation (){
        if (searchPage === 0){
            setStationList(props.data.data.sort((x, y) => x['ReturnStationName'].localeCompare(y['ReturnStationName'])).slice(stationNumStart, stationNumEnd))
        } else {
            setStationList(pagnationList.sort((x, y) => x['ReturnStationName'].localeCompare(y['ReturnStationName'])).slice(stationNumStart, stationNumEnd))
        }
    }
    function sortDuration (){
        if (searchPage === 0){
            setStationList(props.data.data.sort((x, y) => y['Duration'] - x['Duration']).slice(stationNumStart, stationNumEnd))
        } else {
            setStationList(pagnationList.sort((x, y) => y['Duration'] - x['Duration']).slice(stationNumStart, stationNumEnd))
        }
    }
    function sortDistance () {
        if (searchPage === 0){
            setStationList(props.data.data.sort((x, y) => y['CoveredDistance'] - x['CoveredDistance']).slice(stationNumStart, stationNumEnd))
        } else {
            setStationList(pagnationList.sort((x, y) => y['CoveredDistance'] - x['CoveredDistance']).slice(stationNumStart, stationNumEnd))
        }
    }

    function ChangeLen(x, y){
        setStationNumStart(x)
        setStationNumEnd(y)
    }
    const LoadMoreData = async () => {
        console.log(searchPage)
        try {
            //const newPage = await axios.get(`http://localhost:3003/api/v1/jorneys/fifty?page=${searchPage}&station=${name}`)
            const newPage = await axios.get(`https://hsl-1s0l.onrender.com/api/v1/jorneys/fifty?page=${searchPage}&station=${name}`)

            setPagnationList(newPage.data.data)
            setStationList(newPage.data.data.slice(0, 10))
            stationNumStart(0)
            setStationNumEnd(10)

            if (newPage.data.results === 0 ){
                setTimeout(() => {
                    setMessage("No data anymore...")
                }, 3000)
            } 
        } catch(e) {

        } 
    }

    return(
        <div className='container'>
            
            <table style={{ color: "white", marginTop: "1.2rem" }} className='table table-md '>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Return <button onClick={() => sortStation()}  style={{ backgroundColor: "transparent", borderColor: "transparent"}} className="btn btn-primary  dropdown-toggle dropdown-toggle-split"></button></th>
                        <th scope='col'>Cov Distance <button onClick={() => sortDistance()} style={{ backgroundColor: "transparent", borderColor: "transparent"}} className="btn btn-primary  dropdown-toggle dropdown-toggle-split"></button></th>
                        <th scope='col'>Duration <button onClick={() => sortDuration()} style={{ backgroundColor: "transparent", borderColor: "transparent"}} className="btn btn-primary  dropdown-toggle dropdown-toggle-split"></button></th>
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

            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group me-2" role="group" aria-label="First group">
                <button onClick={() => ChangeLen(0, 10)} type="button" className="btn btn-outline-primary">1</button>
                <button onClick={() => ChangeLen(10, 20)} type="button" className="btn btn-outline-primary">2</button>
                <button onClick={() => ChangeLen(20, 30)} type="button" className="btn btn-outline-primary">3</button>
                <button onClick={() => ChangeLen(30, 40)} type="button" className="btn btn-outline-primary">4</button>
                <button onClick={() => ChangeLen(40, 50)} type="button" className="btn btn-outline-primary">5</button>
                
                <div className="btn-group">
                    <button onClick={() => LoadMoreData()} type="button" className="btn btn-primary">Load More Data</button>
                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        <li onClick={() => setSearchPage(1)} className="dropdown-item text-left">1-50</li>
                        
                        <li onClick={() => setSearchPage(2)} className="dropdown-item text-left">50-100</li>
                        
                        <li onClick={() => setSearchPage(3)} className="dropdown-item text-left">100-150</li>
                        
                        <li onClick={() => setSearchPage(4)} className="dropdown-item text-left">150-200</li>
                        
                        <li onClick={() => setSearchPage(5)} className="dropdown-item text-left">200-250</li>
                        
                    </ul>
                </div>
                

            </div>
            </div>
        </div>
    )
}

export default StationTable
