const rootUrl = 'http://api.openweathermap.org/data/2.5/weather';
const api_key = '82b3237b6c2169c9bc02bf958315845d';
exports.fetchWeather = (lat, lon) => {
    let url = rootUrl + '?appid=' + api_key + '&lat=' + lat + '&lon=' + lon
    console.log(url)

    return fetch(url)
        .then(res => res.json())
        .then(json => ({
            //return {
                name: json.name,
                temp: json.main.temp,
                humidity: json.main.humidity,
                pressure: json.main.pressure,
                cloud_cover: json.clouds.all,
                weather: json.weather[0].main,
                visibility: json.visibility,
                description: json.weather[0].description,
                icon: json.weather[0].icon,
                sunrise: json.sys.sunrise,
                sunset: json.sys.sunset,
                wind_deg: json.wind.deg,
                wind_speed: json.wind.speed,
                rain: json.wind.rain
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

const wuKEY = '250ce64540802eac';
exports.fetchConditions = (lat, lon) => {
    let url = `http://api.wunderground.com/api/${wuKEY}/conditions/q/${lat},${lon}.json`;
    console.log(url);
    return fetch(url)
    .then(res => res.json()).then(json => ({
        name: json.current_observation.display_location.full,
        weather: json.current_observation.weather,
        temp_c: json.current_observation.temp_c,
        relative_humidity: json.current_observation.relative_humidity,
        wind_string: json.current_observation.wind_string,
        wind_kph: json.current_observation.wind_kph,
        wind_degrees: json.current_observation.wind_degrees,
        UV: json.current_observation.UV,
        feelslike_c: json.current_observation.feelslike_c,
        precip_today_metric: json.current_observation.precip_today_metric,
        visibility_km: json.current_observation.visibility_km,
        pressure_mb: json.current_observation.pressure_mb,
        dewpoint_c: json.current_observation.dewpoint_c,
        icon: json.current_observation.icon,
    }))
}

exports.fetchForecast = (lat, lon) => {
    let url = `http://api.wunderground.com/api/${wuKEY}/forecast10day/q/${lat},${lon}.json`;
    console.log(url);
    return fetch(url)
    .then(res => res.json()).then(json => ({
        data: json.forecast.simpleforecast
    }))
}

exports.fetchHourly = (lat, lon) => {
    let url = `http://api.wunderground.com/api/${wuKEY}/hourly/q/${lat},${lon}.json`;
    console.log(url);
    return fetch(url)
    .then(res => res.json()).then(json => ({
        data: json.hourly_forecast
    }))
}