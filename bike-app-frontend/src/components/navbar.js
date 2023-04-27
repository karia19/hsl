import React, { useState } from 'react';
import Brand from '../images/map-marker.png'

const NavBar = () => {
    const [ searchPlace, setSearchPlace ] = useState('')

    const station = () => {
        console.log(searchPlace)
    }



    return(
        
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/sstats">Stats</a>
                        </li>
                    </ul>
                </div>
                <button type="button" class="navbar-toggler collapsed" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="mx-auto order-0">
                    <a class="navbar-brand mx-auto" href="/">
                        <img src={Brand} alt="" width="40" height="30"></img>HSL Bike App 
                    </a>
                </div>
                <div class="navbar-collapse collapse w-100 order-3 navbar-collapse">


                <form className="ms-auto d-flex">
                    <input onChange={(e) => setSearchPlace(e.target.value)} className="form-control me-1 shadow-none" type="search" placeholder="Search" aria-label="Search" />
                </form>
                <button onClick={station} className="btn btn-outline-success" type="submit">Search</button>

            </div>
        </div>
    </nav>
    )
}

export default NavBar;