import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // 4.4.2

import { fetchWeather } from '../WeatherAPI';

const loIcon = <Icon name="ios-pin-outline" size={30} color="white" />; 

const iconNames = {
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Dizzle: 'md-umbrella'
}

export default class WeatherView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
          temp: 0,
          weather: 'Clear',
          today: (new Date()).getDay(),
          name: 'California',
          description: ''

        }
  }

  getWeekDay(n) {
    let d = 'Sunday';

    switch (n) {
      case 1:
        d = 'Monday';
        break;
      case 2:
        d = 'Tuesday';
        break;
      case 3:
        d = 'Wednesday';
        break;
      case 4:
        d = 'Thursday';
        break;
      case 5:
        d = 'Friday';
        break;
      case 6:
        d = 'Saturday';
        break;
      default:
        break;
    }
    return d;
  }

  // componentWillMount() {
  //   this.state = {
  //     temp: 0,
  //     weather: 'Clear'
  //   }
  // }

  componentDidMount() {
    this.getLocation()
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => this.setState({
          temp: res.temp - 273.15 ,
          weather: res.weather,
          name: res.name,
          description: res.description,
        })),
      (error) => alert(error),
      { timeout: 10000 } 
    )
  }
  
  render() {
    return (
      <View style={styles.container}>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?dpr=1&auto=compress,format&fit=crop&w=1576&h=&q=80&cs=tinysrgb&crop=',
          }}
          style={styles.imageBg}>
          <View style={styles.upperContainer}>
            <View style={styles.locationContainer}>
              <Text style={styles.location}>{loIcon} {this.state.name}</Text>
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.tempContainer}>
                <Text style={styles.temp}>{this.state.temp}</Text>
                <Text style={styles.degree}>°</Text>
              </View>
              <Text style={styles.status}>{this.state.weather}</Text>
              <Text style={styles.description}>{this.capitalizeFirstLetter(this.state.description)}</Text>
            </View>
          </View>
        </Image>

        <View style={styles.footer}>
          <View style={styles.daily}>
            <Text style={styles.dailyText}>{this.getWeekDay(this.state.today)}</Text>
            <Text style={styles.dailyText}>18°</Text>
            <Icon name={iconNames[this.state.weather]} size={40} color={'black'}/>
          </View>
          <View style={styles.daily}>
            <Text style={styles.dailyText}>{this.getWeekDay((this.state.today + 1) % 7)}</Text>
            <Text style={styles.dailyText}>21°</Text>
          </View>
          <View style={styles.daily}>
            <Text style={styles.dailyText}>{this.getWeekDay((this.state.today + 2) % 7)}</Text>
            <Text style={styles.dailyText}>20°</Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageBg: {
    flex: 2,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingTop: 20,
  },
  upperContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: {
    fontSize: 100,
  },
  degree: {
    fontSize: 50,
    marginTop: -30,
  },
  status: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
  },
  locationContainer: {
    height: 20,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  location: {
    fontSize: 20,
    color: 'white',
  },
  footer: {
    flex: 1,
  },
  daily: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
  },
  dailyText: {
    fontSize: 20,
  },
});