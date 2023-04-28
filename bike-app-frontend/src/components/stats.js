import React, { useEffect, useState } from "react";
import axios from "axios";

const duratioUrl = "http://localhost:3003/api/v1/jorneys/longestDuration"
const distanceUrl = "http://localhost:3003/api/v1/jorneys/longestDistance"

const Stats = () => {
    const [ longestDistanve, setLongestDistnce ] = useState([])
    const [ longestDuration, setLongestDuration ] = useState([])
    const [ message, setMessage ] = useState('')

    useEffect(() => {
        (async() => {
            try{
                const duration = await axios.get(duratioUrl)
                setLongestDuration(duration.data)
                const distance = await axios.get(distanceUrl)
                setLongestDistnce(distance.data)

            } catch(e){
                setMessage("Error in loading data...")
            }
        })();
    },[])

    return(
        <h1>Stats</h1>
    )
}


export default Stats;