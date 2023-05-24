import axios from "axios"


export async function fetchData(url) {
    try {
        const stationData = await axios.get(url)
        return (stationData.data.data)
    } catch(e){
        console.log("Error from api to fetch stations",e)
    }
};