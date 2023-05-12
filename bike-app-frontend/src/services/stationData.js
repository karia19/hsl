
const ten = '31f755'
const fifteen = '13e3f2'
const seventeen = 'cc31f7'
const twenty = 'f731a1'
const thirty = '1af213'
const lessTen = 'e22854'

const ModStationData = async ( stations )  => {
    const modDataArray = []
    let color =  [241, 196, 15]

    for (let i = 0; i < stations.data.length; i++){

        if (Number(stations.data[i]['Kapasiteet']) > 25 ){
            color = thirty
        } else if (Number(stations.data[i]['Kapasiteet']) < 12 ) {
            color = lessTen 
        } else if (Number(stations.data[i]['Kapasiteet']) > 12 && Number(stations.data[i]['Kapasiteet']) < 17 ) {  
            color = fifteen
        
        } else if (Number(stations.data[i]['Kapasiteet']) > 17 && Number(stations.data[i]['Kapasiteet']) < 25 ) {  
            color = seventeen
        
        } else {
            color = ten
        }


        
        modDataArray.push({ 
                 ID:  stations.data[i]['ID'],
                 Name: stations.data[i]['Nimi'], Adress: stations.data[i]['Adress'],
                 Kapasiteetti: stations.data[i]['Kapasiteet'],
                 x: stations.data[i]['x'] , y:stations.data[i]['y'],
                 Color: color
        })


        
    }
    console.log(modDataArray)
    return modDataArray;


}

export default ModStationData;