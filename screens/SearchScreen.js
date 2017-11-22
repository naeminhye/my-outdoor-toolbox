import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableHighlight,
  Picker,
} from 'react-native';
import {RkText, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import { Constants, Location, Permissions } from 'expo';
import GoogleMapAPI from '../GoogleMapAPI';
import ListItem from '../components/ListItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Search';
const placeType = [
  { name: 'All', value: '' },
  { name: 'Accounting', value: 'accounting' },
  { name: 'Airport', value: 'airport' },
  { name: 'Amusement Park', value: 'amusement_park' },
  { name: 'Aquarium', value: 'aquarium' },
  { name: 'Art Gallery', value: 'art_gallery' },
  { name: 'ATM', value: 'atm' },
  { name: 'Bakery', value: 'bakery' },
  { name: 'Bank', value: 'bank' },
  { name: 'Bar', value: 'bar' },
  { name: 'Beauty Salon', value: 'beauty_salon' },
  { name: 'Bicycle Store', value: 'bicycle_store' },
  { name: 'Book Store', value: 'book_store' },
  { name: 'Bowling Alley', value: 'bowling_alley' },
  { name: 'Bus Station', value: 'bus_station' },
  { name: 'Café', value: 'cafe' },
  { name: 'Campground', value: 'campground' },
  { name: 'Car Dealer', value: 'car_dealer' },
  { name: 'Car Rental', value: 'car_rental' },
  { name: 'Car Repair', value: 'car_repair' },
  { name: 'Car Wash', value: 'car_wash' },
  { name: 'Casino', value: 'casino' },
  { name: 'Cemetery', value: 'cemetery' },
  { name: 'Church', value: 'church' },
  { name: 'City Hall', value: 'city_hall' },
  { name: 'Clothing Store', value: 'clothing_store' },
  { name: 'Convenience Store', value: 'convenience_store' },
  { name: 'Courthouse', value: 'courthouse' },
  { name: 'Dentist', value: 'dentist' },
  { name: 'Department Store', value: 'department_store' },
  { name: 'Doctor', value: 'doctor' },
  { name: 'Electrician', value: 'electrician' },
  { name: 'Electronics Store', value: 'electronics_store' },
  { name: 'Embassy', value: 'embassy' },
  { name: 'Fire Station', value: 'fire_station' },
  { name: 'Florist', value: 'florist' },
  { name: 'Funeral Home', value: 'funeral_home' },
  { name: 'Furniture Store', value: 'furniture_store' },
  { name: 'Gas Station', value: 'gas_station' },
  { name: 'Gym', value: 'gym' },
  { name: 'Hair Care', value: 'hair_care' },
  { name: 'Hardware Store', value: 'hardware_store' },
  { name: 'Hindu Temple', value: 'hindu_temple' },
  { name: 'Home Goods Store', value: 'home_goods_store' },
  { name: 'Hospital', value: 'hospital' },
  { name: 'Insurance Agency', value: 'insurance_agency' },
  { name: 'Jewelry Store', value: 'jewelry_store' },
  { name: 'Laundry', value: 'laundry' },
  { name: 'Lawyer', value: 'lawyer' },
  { name: 'Library', value: 'library' },
  { name: 'Liquor Store', value: 'liquor_store' },
  { name: 'Local Government Office', value: 'local_government_office' },
  { name: 'Locksmith', value: 'locksmith' },
  { name: 'Lodging', value: 'lodging' },
  { name: 'Meal Delivery', value: 'meal_delivery' },
  { name: 'Meal Takeaway', value: 'meal_takeaway' },
  { name: 'Mosque', value: 'mosque' },
  { name: 'Movie Rental', value: 'movie_rental' },
  { name: 'Movie Theater', value: 'movie_theater' },
  { name: 'Moving Company', value: 'moving_company' },
  { name: 'Museum', value: 'museum' },
  { name: 'Night Club', value: 'night_club' },
  { name: 'Painter', value: 'painter' },
  { name: 'Park', value: 'park' },
  { name: 'Parking', value: 'parking' },
  { name: 'Pet Store', value: 'pet_store' },
  { name: 'Pharmacy', value: 'pharmacy' },
  { name: 'Physiotherapist', value: 'physiotherapist' },
  { name: 'Plumber', value: 'plumber' },
  { name: 'Police', value: 'police' },
  { name: 'Post Office', value: 'post_office' },
  { name: 'Real Estate Agency', value: 'real_estate_agency' },
  { name: 'Restaurant', value: 'restaurant' },
  { name: 'Roofing Contractor', value: 'roofing_contractor' },
  { name: 'RV Park', value: 'rv_park' },
  { name: 'School', value: 'school' },
  { name: 'Shoe Store', value: 'shoe_store' },
  { name: 'Shopping Mall', value: 'shopping_mall' },
  { name: 'Spa', value: 'spa' },
  { name: 'Stadium', value: 'stadium' },
  { name: 'Storage', value: 'storage' },
  { name: 'Store', value: 'store' },
  { name: 'Subway Station', value: 'subway_station' },
  { name: 'Synagogue', value: 'synagogue' },
  { name: 'Taxi Stand', value: 'taxi_stand' },
  { name: 'Train Station', value: 'train_station' },
  { name: 'Transit Station', value: 'transit_station' },
  { name: 'Travel Agency', value: 'travel_agency' },
  { name: 'University', value: 'university' },
  { name: 'Veterinary Care', value: 'veterinary_care' },
  { name: 'Zoo', value: 'zoo' },
];

const placeRadius = [
  { name: '500m', value: 500 },
  { name: '1km', value: 1000 },
  { name: '5km', value: 5000 },
  { name: '10km', value: 10000 },
  { name: '50km', value: 50000 },
  { name: '100km', value: 100000 },
];

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _focus: false,
      typeModalVisible: false,
      radiusModalVisible: false,
      locationResult: null,
      lat: 0,
      lon: 0,
      radius: 500, // meters
      tmpRadius: 500,
      type: '',
      tmpType: '',
      inputValue: '',
      status: '',
      results: [],
    };

    this._getLocationAsync = this._getLocationAsync.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleSubmitText = this._handleSubmitText.bind(this);
  }

  getTypeName(_type) {
    return placeType.find(
      (place) => {return place.value === _type;}
    ).name;
  }
  
  getRadiusName(_type) {
    return placeRadius.find(
      (place) => {return place.value === _type;}
    ).name;
  }

  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-search' : 'ios-search-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  };
  
  setTypeModalVisible(visible) {
    this.setState({ typeModalVisible: visible });
  }
  
  setRadiusModalVisible(visible) {
    this.setState({ radiusModalVisible: visible });
  }

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
    //this._getUVIndex(this.state.lat, this.state.lon);
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

  //renderModal()

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight }}>
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.typeModalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ padding: 20, backgroundColor: 'white', height: 300 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 20,
              height: 40,
            }}>
            <TouchableHighlight
              onPress={() => {
                this.setTypeModalVisible(!this.state.typeModalVisible);
                this.setState({
                  tmpType: this.state.type,
                });
              }}>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                Cancel
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.setTypeModalVisible(!this.state.typeModalVisible);
                let _type = this.state.tmpType;
                this.setState({
                  type: _type,
                  tmpType: _type,
                });
                console.log(this.state.type + this.state.radius);
              }}>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                Done
              </Text>
            </TouchableHighlight>
          </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>
                Type of Place
              </Text>
              <Picker
                selectedValue={this.state.tmpType}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ tmpType: itemValue })}>
                {placeType.map((type, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={type.name}
                      value={type.value}
                    />
                  );
                })}
              </Picker>
            </View>
        </View>
      </View>
    </Modal>
    <Modal
    animationType="slide"
    transparent={true}
    visible={this.state.radiusModalVisible}
    onRequestClose={() => {
      alert('Modal has been closed.');
    }}>
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <View style={{ padding: 20, backgroundColor: 'white', height: 300 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 20,
            height: 40,
          }}>
          <TouchableHighlight
            onPress={() => {
              this.setRadiusModalVisible(!this.state.radiusModalVisible);
              this.setState({
                tmpRadius: this.state.radius,
              });
            }}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>
              Cancel
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              this.setRadiusModalVisible(!this.state.radiusModalVisible);
              let _radius = this.state.tmpRadius;
              this.setState({
                radius: _radius,
                tmpRadius: this.state.radius,
              });
              console.log(this.state.type + this.state.radius);
            }}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>
              Done
            </Text>
          </TouchableHighlight>
        </View>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              Type of Place
            </Text>
            <Picker
              selectedValue={this.state.tmpRadius}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ tmpRadius: itemValue })}>
              {placeRadius.map((type, i) => {
                return (
                  <Picker.Item
                    key={i}
                    label={type.name}
                    value={type.value}
                  />
                );
              })}
            </Picker>
          </View>
      </View>
    </View>
  </Modal>
  <ParallaxScrollView
  ref={(scroll) => { this.scrollview = scroll; }}
  backgroundColor="#fff"
  contentBackgroundColor="#fff"
  parallaxHeaderHeight={100}
  stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
  renderForeground={() => (
    <View style={myStyles.screenHeader}>
    <Text
      style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>
      {SCREEN_LABEL}
    </Text>
  </View>
  )}
  renderStickyHeader={() => (
    <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center', justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', margin: 10}}
      onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
    </View>
  )}>
          
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
          <RkTextInput rkType='searchbox' label={<Ionicons style={[styles.inputIcon, styles.searchIcon]} name='ios-search'/>}
          style={{paddingRight: 10, flex: 1, }} clearButtonMode='always'
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
          }}/>
            {/*
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
              {(this.state.inputValue !== '' && this.state._focus)
              ? <TouchableHighlight onPress={() => {
                this.textInput.clear();
                this.textInput.focus();
                this.setState({
                  inputValue: '',
                });
              }}>
                  <Ionicons
                    name="ios-close-circle"
                    size={20}
                    style={{ paddingLeft: 5 }}
                    color="#8e8e93"
                  />
                </TouchableHighlight>
              : null}
            </View>
            */}
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
          <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
          style={{flex: 1}}
          onPress={()=> {
            this.setTypeModalVisible(!this.state.typeModalVisible);
          }}>
            <Text style={{ fontSize: 18 }}>Type: {this.getTypeName(this.state.type)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{flex: 1}}
          onPress={()=> {
            this.setRadiusModalVisible(!this.state.radiusModalVisible);
          }}>
            <Text style={{ fontSize: 18 }}>Radius: {this.getRadiusName(this.state.radius)}</Text>
          </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            {this.state.status === 'OK'
              ? <FlatList
                  data={this.state.results}
                  keyExtractor={(item, index) => index}
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
                      marginTop: 200,
                    }}>
                    No results
                  </Text>
                </View>}
          </View>
          </ParallaxScrollView>
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
  inputIcon: {
    fontSize: 15,
    color: '#0000003a',
    marginLeft: 4,
  },
  searchIcon: {
    marginLeft: 16,
  }
});

RkTheme.setType('RkTextInput','searchbox',{
  height: 40,
  borderRadius: 50,
  underlineColor:'#0000001A',
  backgroundColor: '#0000001A'
}); 