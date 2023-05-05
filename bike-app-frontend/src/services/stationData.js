
const ten = '31f755'
const fifteen = 'e3f731'
const seventeen = 'cc31f7'
const twenty = 'f731a1'
const thirty = '31f7a8'
const lessTen = '3180f7'

exports.ModStationData = async ( stations )  => {
    const modDataArray = []
    let color =  [241, 196, 15]

    for (let i = 0; i < stations.data.length; i++){

        if (Number(stations.data[i]['Kapasiteet']) > 30 ){
            color = thirty
        } else if (Number(stations.data[i]['Kapasiteet']) < 12 ) {
            color = lessTen 
        } else if (Number(stations.data[i]['Kapasiteet']) > 15 && Number(stations.data[i]['Kapasiteet']) < 17 ) {  
            color = fifteen
        
        } else if (Number(stations.data[i]['Kapasiteet']) > 17 && Number(stations.data[i]['Kapasiteet']) < 20 ) {  
            color = seventeen
            
        } else if (Number(stations.data[i]['Kapasiteet']) > 20 && Number(stations.data[i]['Kapasiteet']) < 27 ) {  
            color = twenty
            
        

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