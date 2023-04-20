
const ten = [241, 196, 15]
const fifteen = [39, 174, 96]
const seventeen = [52, 152, 219]
const twenty = [155, 89, 182]
const thirty = [192, 57, 43]
const lessTen = [189, 195, 199]

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
                 name: stations.data[i]['Name'], adress: stations.data[i]['Adress'],
                 position: [ stations.data[i]['x'] , stations.data[i]['y']],
                 radius: 4 , 
                 Color: color
        })


        
    }
    console.log(modDataArray)
    return modDataArray;


}