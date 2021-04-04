client2Hotspot(element,asteroidsDataList){
    let maxLat;
    let minLat;
    let maxLong;
    let minLong;
    //Calculamos maxLat,minLat,maxLong y minLong
    maxLat = element.Latitude + 15;
    minLat = element.Latitude - 15;
    maxLong = element.Longitude + 15;
    minLong = element.Longitude - 15;
    asteroidsDataList.forEach(item => {
        //Comprobamos que se cumple la latidude
        if ((item.Latitude > minLat) && (item.Latitude < maxLat)){
            //Comprobamos que se cumple la longitude
            if ((item.Longitude > minLong) && (item.Longitude < maxLong)){
                 //Si se ha cumplido todo lo anterior entonces contamos un asteroide más
                element.Hotspot_asteroids = element.Hotspot_asteroids + 1;
            }
        }
   })
   return element.Hotspot_asteroids;
}