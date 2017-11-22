import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    Platform,
    ScrollView,
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../WeatherAPI';

const ITEM_WIDTH = 280,
ITEM_HEIGHT = 360;

export default class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            date: 'Today',
            temp: 0,

        };
        API.weatherByCityId(this.props.cityId).then(data => {
            this.setState({
                cityName: data.name_of_city,
                temp: (data.temp - 273.15).toFixed(0), 
            });
        });
    }
    render() {
        return (
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: { width: -2, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 1,
              }}>
              <Image
                source={{ uri: this.props.uri }}
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  borderRadius: 20,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.7,
                }}
                resizeMode="cover"
              >
                <Text style={styles._place}>{this.state.cityName}</Text>
                <Text style={styles._date}>{this.state.date}</Text>
                <Text style={styles._temperature}>{this.state.temp}°C</Text>
                <Ionicons name={'ios-partly-sunny-outline'} size={ITEM_WIDTH/4} color='white' style={{backgroundColor: 'transparent',}}/>
              </Image>
              <View
                style={{
                  backgroundColor: '#fff',
                  position: 'absolute',
                  bottom: -15,
                  alignSelf: 'center',
                  borderRadius: 50,
                  padding: 10,
                  width: 100,
                  height: 50,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: -2, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 1,
                }}>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name={'ios-share-outline'} size={25}/>
                </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>Share</Text>
              </View>
            </View>
          );
    }
}

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffeecc',
  },
  _place: {
    margin: 10,
    fontSize: ITEM_WIDTH / 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  _date: {
    fontSize: ITEM_WIDTH / 26,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  _temperature: {
    margin: 5,
    fontSize: ITEM_WIDTH / 4,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
});