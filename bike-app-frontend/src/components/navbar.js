import React, { useState } from 'react';
import Brand from '../images/map-marker.png'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const [ searchPlace, setSearchPlace ] = useState('')

    const station = () => {
        console.log(searchPlace)
    }



    return(
        
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-links" to="/stats">Stats</NavLink>
                        </li>
                    </ul>
                </div>
                <button type="button" className="navbar-toggler collapsed" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="mx-auto order-0">
                    <a className="navbar-brand mx-auto" href="/">
                        <img src={Brand} alt="" width="40" height="30"></img>HSL Bike App 
                    </a>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 navbar-collapse">


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