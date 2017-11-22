// const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=82b3237b6c2169c9bc02bf958315845d'

// export const fetchWeather = (lat, lon) => {
//     const url = rootUrl + '&lat=' + lat + '&lon=' + lon
//     console.log(url)

//     return fetch(url)
//         .then(res => res.json())
//         .then(json => ({
//             //return {
//                 temp: json.main.temp,
//                 weather: json.weather[0].main,
//                 name: json.name,
//                 description: json.weather[0].description,
//             //}
//         }))
//         // .catch(error => {
//         //     console.log('There has been a problem with your fetch operation: ' + error.message);
//         //     // ADD THIS THROW error
//         //      throw error;
//         // });
// }

const rootUrl = 'http://api.openweathermap.org/data/2.5/weather';
const api_key = '82b3237b6c2169c9bc02bf958315845d';
exports.fetchWeather = (lat, lon) => {
    let url = rootUrl + '?appid=' + api_key + '&lat=' + lat + '&lon=' + lon
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
exports.weatherByCityId = (cityId) => {
    let url = `${rootUrl}?appid=${api_key}&id=${cityId}`;
    //console.log(url);
    return fetch(url).then(res => res.json()).then(json => {
        return {
            name_of_city: json.name,
            temp: json.main.temp,
        // cloudiness: json.clouds.all, // %
        // weather_description: json.weather.description,
        // ...
    };
});
  };
//