const math = require('mathjs')



const calculateStat = async (fromDbByStation, returnByStation) => {
    try {
        /// stats from departure station ///
        const meanDistance = math.mean(fromDbByStation.map(x => x['CoveredDistance']))
        const maxDistance = Math.max(...fromDbByStation.map(x => x['CoveredDistance']))

        const meanDuration = math.mean(fromDbByStation.map(x => x['Duration']))
        const maxDuration = Math.max(...fromDbByStation.map(x => x['Duration']))
 
        /// stations from return station /// 
        const returnMeanDistance = math.mean(returnByStation.map(x => x['CoveredDistance']))
        const returnMaxDistance = Math.max(...returnByStation.map(x => x['CoveredDistance']))

        const returnMeanDuration = math.mean(returnByStation.map(x => x['Duration']))
        const returnMaxDuration = Math.max(...returnByStation.map(x => x['Duration']))

        return {
            departureResults: fromDbByStation.length,
            departureMeanDistance: meanDistance / 1000,
            departureMaxDistance: maxDistance / 1000,
            departureMeanDuration: meanDuration / 60,
            departureMaxDuration: maxDuration / 60,
            departureMeanSpeed: (meanDistance / 1000) / (meanDuration / 3600),
            
            retrunResults: returnByStation.length,
            returnMeanDistance: returnMeanDistance / 1000,
            returnMaxDistance: returnMaxDistance / 1000,
            returnMeanDuration: returnMeanDuration / 60,
            returnMaxDuration: returnMaxDuration / 60,
            returnMeanSpeed: (returnMeanDistance / 1000) / (returnMeanDuration / 3600),

            data: fromDbByStation.slice(0, 50)
        }

    } catch(e) {
        return {
            results: fromDbByStation.length,
            meanDistance: 0,
            maxDistance: 0,
            meanDuration: 0,
            maxDuration: 0,
            meanSpeed: 0,
            data: fromDbByStation.slice(0, 50)
        }

    }

}


module.exports = calculateStat
