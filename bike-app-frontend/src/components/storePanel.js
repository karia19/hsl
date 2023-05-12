import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as e from 'express';



const URL_stations = 'http://localhost:3003/api/v1/stations'


const StorePanel = () => {
    const [ stations, setStations ] = useState([]);
    const [ message, setMessage ] = useState('');
    const [ namnn, setNamn ] = useState('')
    const [ name, setName ] = useState('')    
    const [ nimi, setNimi ] = useState('')
    const [ adress, setAdress ] = useState('')
    const [ osoite, setOsoite ] = useState('')
    const [ kaupunki, setKaupunki ] = useState('')
    const [ stad, setStad ] = useState('')
    const [ operaattori, setOperaattori ] = useState('')
    const [ kapasiteetti, setKapasiteetti ] = useState('')
    const [ longitude , setLongitude ]  = useState('')
    const [ latitude, setLatitude ] = useState('')

    useEffect(() => {
        (async() => {
            try {
                const stationData = await axios.get(URL_stations)
                setStations(stationData.data.data)
            } catch(e){

            }
        })();
    }, [])
    const removeStation = async (id, buttonId) => {
        console.log(id, buttonId)
        const buttonI = 'button-modal-'+ buttonId
        const modalButton = document.getElementById(buttonI)
        try {
            const deleteRes = await axios.delete(`http://localhost:3003/api/v1/store/station/${1222}`)
            console.log(deleteRes)
            

            if (deleteRes.status === 200){   
                const t = document.createTextNode(" Succes ...");
                modalButton.appendChild(t)
                setTimeout(() => {
                    modalButton.removeChild(t)
                }, 2000)
            }
        } catch (e)  {
            const t = document.createTextNode(" Error ...");
            modalButton.appendChild(t)
            setTimeout(() => {
                modalButton.removeChild(t)
            }, 2000)
        }
    }
    const sendStation = async () => {
        if ( nimi ===  '' || namnn === '' || adress === '' || osoite === '' || kaupunki === '' || stad === '' || operaattori === '' || kapasiteetti === '' || longitude === '' || latitude === ''){
            setMessage("Please fill all fields")
            setTimeout(() => {
                setMessage('')
            },3000)
        } else {
            // ID is pseudo random number ///
            const data = {
                FID: stations.length + 1, ID: stations.length + 22, nimi: nimi, namnn: namnn, adress: adress, osoite: osoite, kaupunki: kaupunki, stad: 
                stad, operaattori: operaattori, kapasiteetti: kapasiteetti,
                longitude: longitude, latitude: latitude
            }
            const resStore = await axios.post('http://localhost:3003/api/v1/store/station', data)
            if (resStore.status === 200){
                setMessage("Station added")
                setTimeout(() => {
                    setMessage('')
                },3000)
            }}
        
    }

    const ShowStations = () => {
        if (stations.length === 0){
            return(
                <div>
                    <p>No Data ......</p>
                </div>
            )
        } else {
            console.log(stations)
            return(
                <div style={{ marginTop: "1.2rem"}}>

                    <h2>All Stations</h2>     
                    <table className='table table-ms '>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Station</th>
                            <th scope='col'>Jorneys</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.map((x, index) => 
                            <tr key={index}>
                                <td>{x.FID}</td>
                                <td>{x.Name}</td>
                                <td >{x.Adress}</td>
                                <td  ><button  id={`button-modal-${x.FID}`} onClick={() => removeStation(x._id, x.FID)} className='btn btn-outline-danger btn-sm'>Remove</button></td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                
            )
        }
    }
    
    return (
        <div className='container'>
            <h2 style={{ marginTop:"1.3rem"}} className='text-center'>Add station</h2>
            <form className="row g-3">
                <div className="col-6">
                    <label  className="form-label">Nimi</label>
                    <input onChange={(e) => setNimi(e.target.value)} type="text" className="form-control" id="Nimi" placeholder="Hanasaari" />
                </div>
                
                <div className="col-6">
                    <label  className="form-label">Namn</label>
                    <input  onChange={(e) => setNamn(e.target.value)} type="text" className="form-control" id="namn" placeholder="Hanaholmen" />
                </div>
                
                <div className="col-6">
                    <label  className="form-label">Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Hanasaari" />
                </div>

                <div className="col-6">
                    <label  className="form-label">Address</label>
                    <input onChange={(e) => setAdress(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="Hanaholmsstranden 1" />
                </div>
                <div className="col-6">
                    <label  className="form-label">Osoite</label>
                    <input onChange={(e) => setOsoite(e.target.value)} type="text" className="form-control" id="inputAddress2" placeholder="Hanasaarenranta 1" />
                </div>
                <div className="col-6">
                    <label  className="form-label">Kaupunki</label>
                    <input onChange={(e) => setKaupunki(e.target.value)}  type="text" className="form-control" id="inputAddress2" placeholder="Espoo" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Stad</label>
                    <input onChange={(e) => setStad(e.target.value)} type="text" className="form-control" id="inputCity" placeholder='Esbo'/>
                </div>

                <div className="col-md-6">
                    <label  className="form-label">Operaattori</label>
                    <input onChange={(e) => setOperaattori(e.target.value)} type="text" className="form-control" id="inputCity" placeholder='CityBike Finland'/>
                </div>

                <div className="col-md-6">
                    <label  className="form-label">Kapasiteetti</label>
                    <input onChange={(e) => setKapasiteetti(e.target.value)} type="text" className="form-control" id="inputCity" placeholder='16'/>
                </div>
                
                <div className="col-md-6">
                    <label  className="form-label">Longitude</label>
                    <input onChange={(e) => setLongitude(e.target.value)}  type="number" step=".00001" className="form-control" id="longitude" placeholder='24.840319'/>
                </div>

                <div className="col-md-6">
                    <label  className="form-label">Latitude</label>
                    <input onChange={(e) => setLatitude(e.target.value)}  type="number" step=".00001" className="form-control" id="latitude" placeholder='60.16582'/>
                </div>
           
                
            </form>
            {message.length !== 0 ? <div style={{ marginTop:"1.3rem"}}className="alert alert-primary" role="alert">
                {message}
            </div> : null}
            <div style={{ marginTop:"1.3rem"}} className="col-12">
                    <button onClick={() => sendStation()} type="submit" className="btn btn-primary">Send</button>
            </div>
            <ShowStations />
        </div>
    );
}

export default StorePanel;
