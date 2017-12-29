import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    Platform,
    ListView,
    ScrollView,
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchForecast, fetchHourly } from '../WeatherAPI';

const ds1 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
ds2 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

let { width, height } = Dimensions.get('window');

const weather = [
	{ icon: 'chanceflurries', image: require('../assets/icons/weather/chanceflurries.png') },
	{ icon: 'chancerain', image: require('../assets/icons/weather/chancerain.png') },
	{ icon: 'chancesleet', image: require('../assets/icons/weather/chancesleet.png') },
	{ icon: 'chancesnow', image: require('../assets/icons/weather/chancesnow.png') },
	{ icon: 'chancetstorms', image: require('../assets/icons/weather/chancetstorms.png') },
	{ icon: 'clear', image: require('../assets/icons/weather/clear.png') },
	{ icon: 'cloudy', image: require('../assets/icons/weather/cloudy.png') },
	{ icon: 'flurries', image: require('../assets/icons/weather/flurries.png') },
	{ icon: 'fog', image: require('../assets/icons/weather/fog.png') },
	{ icon: 'hazy', image: require('../assets/icons/weather/hazy.png') },
	{ icon: 'mostlycloudy', image: require('../assets/icons/weather/mostlycloudy.png') },
	{ icon: 'mostlysunny', image: require('../assets/icons/weather/mostlysunny.png') },
	{ icon: 'nt_chanceflurries', image: require('../assets/icons/weather/nt_chanceflurries.png') },
	{ icon: 'nt_chancerain', image: require('../assets/icons/weather/nt_chancerain.png') },
	{ icon: 'nt_chancesleet', image: require('../assets/icons/weather/nt_chancesleet.png') },
	{ icon: 'nt_chancesnow', image: require('../assets/icons/weather/nt_chancesnow.png') },
	{ icon: 'nt_chancetstorms', image: require('../assets/icons/weather/nt_chancetstorms.png') },
	{ icon: 'nt_clear', image: require('../assets/icons/weather/nt_clear.png') },
	{ icon: 'nt_cloudy', image: require('../assets/icons/weather/nt_cloudy.png') },
	{ icon: 'nt_flurries', image: require('../assets/icons/weather/nt_flurries.png') },
	{ icon: 'nt_fog', image: require('../assets/icons/weather/nt_fog.png') },
	{ icon: 'nt_hazy', image: require('../assets/icons/weather/nt_hazy.png') },
	{ icon: 'nt_mostlycloudy', image: require('../assets/icons/weather/nt_mostlycloudy.png') },
	{ icon: 'nt_mostlysunny', image: require('../assets/icons/weather/nt_mostlysunny.png') },
	{ icon: 'nt_partlycloudy', image: require('../assets/icons/weather/nt_partlycloudy.png') },
	{ icon: 'nt_partlysunny', image: require('../assets/icons/weather/nt_partlysunny.png') },
	{ icon: 'nt_rain', image: require('../assets/icons/weather/nt_rain.png') },
	{ icon: 'nt_sleet', image: require('../assets/icons/weather/nt_sleet.png') },
	{ icon: 'nt_snow', image: require('../assets/icons/weather/nt_snow.png') },
	{ icon: 'nt_sunny', image: require('../assets/icons/weather/nt_sunny.png') },
	{ icon: 'nt_tstorms', image: require('../assets/icons/weather/nt_tstorms.png') },
	{ icon: 'nt_unknown', image: require('../assets/icons/weather/nt_unknown.png') },
	{ icon: 'partlycloudy', image: require('../assets/icons/weather/partlycloudy.png') },
	{ icon: 'partlysunny', image: require('../assets/icons/weather/partlysunny.png') },
	{ icon: 'rain', image: require('../assets/icons/weather/rain.png') },
	{ icon: 'sleet', image: require('../assets/icons/weather/sleet.png') },
	{ icon: 'snow', image: require('../assets/icons/weather/snow.png') },
	{ icon: 'sunny', image: require('../assets/icons/weather/sunny.png') },
	{ icon: 'tstorms', image: require('../assets/icons/weather/tstorms.png') },
	{ icon: 'unknown', image: require('../assets/icons/weather/unknown.png') },
];

export default class WeatherDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hourly: [],
            month: '',
            day: '',
            daily: ds1.cloneWithRows([]),
            hourlySource: ds2.cloneWithRows([]),
        };
        fetchForecast(this.props.lat, this.props.lon).then(data => {
            var daily = [];
            data.data.forecastday.map((d, i) => {
                daily.push({
                    weekday: d.date.weekday,
                    icon: d.icon,
                    high: d.high.celsius,    
                    low: d.low.celsius,
                });
            });
            this.setState({
                daily: ds1.cloneWithRows(daily),
            });
        });

        fetchHourly(this.props.lat, this.props.lon).then(data => {
            this.setState({
                hourly: data.data,
            });
        });
    }


    render() {
        return (
            <View
              style={{
                  flex: 1,
                  padding: 20,
              }}>
              <ListView
                dataSource={this.state.daily}
                renderRow={rowData => (
                    <View style={{ height: 50, width: width - 20, flexDirection: 'row', }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems : 'flex-start' }}><Text style={{ fontSize: 16, textAlign: 'left' }}>{rowData.weekday}</Text></View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems : 'center' }}>
                            { weather.map((w, i) => {
                                if(rowData.icon == w.icon){
                                return(
                                    <Image key={i} source={w.image} style={{width: 40, height: 40}} resizeMode='cover' />
                                );
                                }
                            })}
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems : 'center' }}><Text style={{ fontSize: 16 }}>{rowData.high}°C</Text></View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems : 'center' }}><Text style={{ fontSize: 16, color: '#999' }}>{rowData.low}°C</Text></View>
                    </View>
                )}/>
            </View>
          );
    }
}