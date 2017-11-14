const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=82b3237b6c2169c9bc02bf958315845d'

export const fetchWeather = (lat, lon) => {
    const url = rootUrl + '&lat=' + lat + '&lon=' + lon
    console.log(url)

    return fetch(url)
        .then(res => res.json())
        .then(json => ({
            //return {
                temp: json.main.temp,
                weather: json.weather[0].main,
                name: json.name,
                description: json.weather[0].description,
            //}
        }))
        // .catch(error => {
        //     console.log('There has been a problem with your fetch operation: ' + error.message);
        //     // ADD THIS THROW error
        //      throw error;
        // });
    

}