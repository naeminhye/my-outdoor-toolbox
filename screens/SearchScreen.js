import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import GoogleMapAPI from '../GoogleMapAPI';
import ListItem from '../components/ListItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _focus: false,
      locationResult: null,
      lat: 0,
      lon: 0,
      radius: 10000,
      type: '',
      inputValue: '',
      status: '',
      results: [],
    };

    this._getLocationAsync = this._getLocationAsync.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleSubmitText = this._handleSubmitText.bind(this);
  }

  static navigationOptions = {
    header: null,
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-search' : 'ios-search-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      locationResult: JSON.stringify(location),
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
    this._getUVIndex(this.state.lat, this.state.lon);
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleSubmitText = () => {
    GoogleMapAPI.nearbysearch(
      this.state.lat,
      this.state.lon,
      this.state.radius,
      this.state.type,
      this.state.inputValue
    ).then(data => {
      this.setState({
        status: data.status,
        results: data.results,
        _focus: false,
      });
      console.log(this.state.status);
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{ marginTop: 20 }}>
          <View style={myStyles.screenHeader}>
            <Text
              style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>
              Search
            </Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <View style={styles.searchBox}>
              <Ionicons
                name="ios-search"
                size={20}
                style={{ paddingRight: 5 }}
              />
              <TextInput
                style={{ flex: 1 }}
                onFocus={() => {
                  this.setState({
                    _focus: true,
                  });
                }}
                ref={input => {
                  this.textInput = input;
                }}
                returnKeyType="search"
                onSubmitEditing={this._handleSubmitText}
                placeholder="Search places"
                value={this.state.inputValue}
                onChangeText={this._handleTextChange}
                onBlur={() => {
                  this.setState({
                    _focus: false,
                  });
                }}
              />
              {this.state.inputValue !== ''
                ? <TouchableOpacity onPress={() => {
                  this.textInput.clear();
                  this.setState({
                    _focus: true,
                    inputValue: '',
                  });
                }}>
                    <Ionicons
                      name="ios-close-circle"
                      size={16}
                      style={{ paddingLeft: 5 }}
                      color="#8e8e93"
                    />
                  </TouchableOpacity>
                : null}
            </View>
            {this.state._focus
              ? <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      _focus: false,
                    });
                    this.textInput.blur();
                  }}>
                  <Text style={{ fontSize: 18, color: '#007aff', margin: 10 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              : null}
          </View>
          <View style={{ flex: 1 }}>
            {this.state.status === 'OK'
              ? <FlatList
                  data={this.state.results}
                  renderItem={({ item }) => (
                    <View>
                      <ListItem name={item.name} vicinity={item.vicinity} />
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#bbbbbb',
                        }}
                      />
                    </View>
                  )}
                />
              : <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      color: '#aaaaaa',
                    }}>
                    No results
                  </Text>
                </View>}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: Constants.statusBarHeight,
  //   backgroundColor: '#fff',
  // },
  searchBox: {
    backgroundColor: '#f0efec',
    flex: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
