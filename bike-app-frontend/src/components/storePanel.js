import React from 'react';


const StorePanel = () => {
    
    
    return (
        <div className='container'>
            <h2 style={{ marginTop:"1.3rem"}} className='text-center'>Add station</h2>
            <form className="row g-3">
                <div className="col-6">
                    <label for="inputAddress" className="form-label">Nimi</label>
                    <input type="text" className="form-control" id="Nimi" placeholder="Hanasaari" />
                </div>
                
                <div className="col-6">
                    <label for="inputAddress" className="form-label">Namn</label>
                    <input type="text" className="form-control" id="namn" placeholder="Hanaholmen" />
                </div>
                
                <div className="col-6">
                    <label for="inputAddress" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Hanasaari" />
                </div>

                <div className="col-6">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Hanaholmsstranden 1" />
                </div>
                <div className="col-6">
                    <label for="inputAddress2" className="form-label">Osoite</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Hanasaarenranta 1" />
                </div>
                <div className="col-6">
                    <label for="inputAddress2" className="form-label">Kaupunki</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Espoo" />
                </div>
                <div className="col-md-6">
                    <label for="inputCity" className="form-label">Stad</label>
                    <input type="text" className="form-control" id="inputCity" placeholder='Esbo'/>
                </div>

                <div className="col-md-6">
                    <label for="inputCity" className="form-label">Operaattori</label>
                    <input type="text" className="form-control" id="inputCity" placeholder='CityBike Finland'/>
                </div>

                <div className="col-md-6">
                    <label for="inputCity" className="form-label">Kapasiteetti</label>
                    <input type="text" className="form-control" id="inputCity" placeholder='16'/>
                </div>

                
                <div className="col-md-6">
                    <label for="inputCity" className="form-label">Longitude</label>
                    <input type="number" step=".00001" className="form-control" id="longitude" placeholder='24.840319'/>
                </div>

                <div className="col-md-6">
                    <label for="inputCity" className="form-label">Latitude</label>
                    <input type="number" step=".00001" className="form-control" id="latitude" placeholder='60.16582'/>
                </div>
           
                
            </form>
            <div style={{ marginTop:"1.3rem"}} className="col-12">
                    <button type="submit" className="btn btn-primary">Send</button>
            </div>
        </div>
    );
}

export default StorePanel;
