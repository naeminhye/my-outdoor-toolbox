import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList,
    TouchableHighlight,
    Picker,
    Image,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import {RkText, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import CustomButton from '../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-super-grid';
import GoogleMapAPI from '../GoogleMapAPI';
import Carousel from 'react-native-snap-carousel';

import Modal from 'react-native-modal';
import SearchPlaceFilter from '../components/SearchPlaceFilter';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const placeType = [
  { name: 'All', value: '', image: require('../assets/icons/place/all.png') },
  { name: 'Accounting', value: 'accounting', image: require('../assets/icons/place/accounting.png') },
  { name: 'Airport', value: 'airport', image: require('../assets/icons/place/airport.png') },
  { name: 'Amusement Park', value: 'amusement_park', image: require('../assets/icons/place/amusement_park.png') },
  { name: 'Aquarium', value: 'aquarium', image: require('../assets/icons/place/aquarium.png') },
  { name: 'Art Gallery', value: 'art_gallery', image: require('../assets/icons/place/art_gallery.png') },
  { name: 'ATM', value: 'atm', image: require('../assets/icons/place/atm.png') },
  { name: 'Bakery', value: 'bakery', image: require('../assets/icons/place/bakery.png') },
  { name: 'Bank', value: 'bank', image: require('../assets/icons/place/bank.png') },
  { name: 'Bar', value: 'bar', image: require('../assets/icons/place/bar.png') },
  { name: 'Beauty Salon', value: 'beauty_salon', image: require('../assets/icons/place/beauty_salon.png') },
  { name: 'Bicycle Store', value: 'bicycle_store', image: require('../assets/icons/place/bicycle_store.png') },
  { name: 'Book Store', value: 'book_store', image: require('../assets/icons/place/book_store.png') },
  { name: 'Bowling Alley', value: 'bowling_alley', image: require('../assets/icons/place/bowling_alley.png') },
  { name: 'Bus Station', value: 'bus_station', image: require('../assets/icons/place/bus_station.png') },
  { name: 'Café', value: 'cafe', image: require('../assets/icons/place/cafe.png') },
  { name: 'Campground', value: 'campground', image: require('../assets/icons/place/campground.png') },
  { name: 'Car Dealer', value: 'car_dealer', image: require('../assets/icons/place/car_dealer.png') },
  { name: 'Car Rental', value: 'car_rental', image: require('../assets/icons/place/car_rental.png') },
  { name: 'Car Repair', value: 'car_repair', image: require('../assets/icons/place/car_repair.png') },
  { name: 'Car Wash', value: 'car_wash', image: require('../assets/icons/place/car_wash.png') },
  { name: 'Casino', value: 'casino', image: require('../assets/icons/place/casino.png') },
  { name: 'Cemetery', value: 'cemetery', image: require('../assets/icons/place/cemetery.png') },
  { name: 'Church', value: 'church', image: require('../assets/icons/place/church.png') },
  { name: 'City Hall', value: 'city_hall', image: require('../assets/icons/place/city_hall.png') },
  { name: 'Clothing Store', value: 'clothing_store', image: require('../assets/icons/place/clothing_store.png') },
  { name: 'Convenience Store', value: 'convenience_store', image: require('../assets/icons/place/convenience_store.png') },
  { name: 'Courthouse', value: 'courthouse', image: require('../assets/icons/place/courthouse.png') },
  { name: 'Dentist', value: 'dentist', image: require('../assets/icons/place/dentist.png') },
  { name: 'Department Store', value: 'department_store', image: require('../assets/icons/place/department_store.png') },
  { name: 'Doctor', value: 'doctor', image: require('../assets/icons/place/doctor.png') },
  { name: 'Electrician', value: 'electrician', image: require('../assets/icons/place/electrician.png') },
  { name: 'Electronics Store', value: 'electronics_store', image: require('../assets/icons/place/electronics_store.png') },
  { name: 'Embassy', value: 'embassy', image: require('../assets/icons/place/embassy.png') },
  { name: 'Fire Station', value: 'fire_station', image: require('../assets/icons/place/fire_station.png') },
  { name: 'Florist', value: 'florist', image: require('../assets/icons/place/florist.png') },
  { name: 'Funeral Home', value: 'funeral_home', image: require('../assets/icons/place/funeral_home.png') },
  { name: 'Furniture Store', value: 'furniture_store', image: require('../assets/icons/place/furniture_store.png') },
  { name: 'Gas Station', value: 'gas_station', image: require('../assets/icons/place/gas_station.png') },
  { name: 'Gym', value: 'gym', image: require('../assets/icons/place/gym.png') },
  { name: 'Hair Care', value: 'hair_care', image: require('../assets/icons/place/hair_care.png') },
  { name: 'Hardware Store', value: 'hardware_store', image: require('../assets/icons/place/hardware_store.png') },
  { name: 'Hindu Temple', value: 'hindu_temple', image: require('../assets/icons/place/hindu_temple.png') },
  { name: 'Home Goods Store', value: 'home_goods_store', image: require('../assets/icons/place/home_goods_store.png') },
  { name: 'Hospital', value: 'hospital', image: require('../assets/icons/place/hospital.png') },
  { name: 'Insurance Agency', value: 'insurance_agency', image: require('../assets/icons/place/insurance_agency.png') },
  { name: 'Jewelry Store', value: 'jewelry_store', image: require('../assets/icons/place/jewelry_store.png') },
  { name: 'Laundry', value: 'laundry', image: require('../assets/icons/place/laundry.png') },
  { name: 'Lawyer', value: 'lawyer', image: require('../assets/icons/place/lawyer.png') },
  { name: 'Library', value: 'library', image: require('../assets/icons/place/library.png') },
  { name: 'Liquor Store', value: 'liquor_store', image: require('../assets/icons/place/liquor_store.png') },
  { name: 'Local Government Office', value: 'local_government_office', image: require('../assets/icons/place/local_government_office.png') },
  { name: 'Locksmith', value: 'locksmith', image: require('../assets/icons/place/locksmith.png') },
  { name: 'Lodging', value: 'lodging', image: require('../assets/icons/place/lodging.png') },
  { name: 'Meal Delivery', value: 'meal_delivery', image: require('../assets/icons/place/meal_delivery.png') },
  { name: 'Meal Takeaway', value: 'meal_takeaway', image: require('../assets/icons/place/meal_takeaway.png') },
  { name: 'Mosque', value: 'mosque', image: require('../assets/icons/place/mosque.png') },
  { name: 'Movie Rental', value: 'movie_rental', image: require('../assets/icons/place/movie_rental.png') },
  { name: 'Movie Theater', value: 'movie_theater', image: require('../assets/icons/place/movie_theater.png') },
  { name: 'Moving Company', value: 'moving_company', image: require('../assets/icons/place/moving_company.png') },
  { name: 'Museum', value: 'museum', image: require('../assets/icons/place/museum.png') },
  { name: 'Night Club', value: 'night_club', image: require('../assets/icons/place/night_club.png') },
  { name: 'Painter', value: 'painter', image: require('../assets/icons/place/painter.png') },
  { name: 'Park', value: 'park', image: require('../assets/icons/place/park.png') },
  { name: 'Parking', value: 'parking', image: require('../assets/icons/place/parking.png') },
  { name: 'Pet Store', value: 'pet_store', image: require('../assets/icons/place/pet_store.png') },
  { name: 'Pharmacy', value: 'pharmacy', image: require('../assets/icons/place/pharmacy.png') },
  { name: 'Physiotherapist', value: 'physiotherapist', image: require('../assets/icons/place/physiotherapist.png') },
  { name: 'Plumber', value: 'plumber', image: require('../assets/icons/place/plumber.png') },
  { name: 'Police', value: 'police', image: require('../assets/icons/place/police.png') },
  { name: 'Post Office', value: 'post_office', image: require('../assets/icons/place/post_office.png') },
  { name: 'Real Estate Agency', value: 'real_estate_agency', image: require('../assets/icons/place/real_estate_agency.png') },
  { name: 'Restaurant', value: 'restaurant', image: require('../assets/icons/place/restaurant.png') },
  { name: 'Roofing Contractor', value: 'roofing_contractor', image: require('../assets/icons/place/roofing_contractor.png') },
  { name: 'RV Park', value: 'rv_park', image: require('../assets/icons/place/rv_park.png') },
  { name: 'School', value: 'school', image: require('../assets/icons/place/school.png') },
  { name: 'Shoe Store', value: 'shoe_store', image: require('../assets/icons/place/shoe_store.png') },
  { name: 'Shopping Mall', value: 'shopping_mall', image: require('../assets/icons/place/shopping_mall.png') },
  { name: 'Spa', value: 'spa', image: require('../assets/icons/place/spa.png') },
  { name: 'Stadium', value: 'stadium', image: require('../assets/icons/place/stadium.png') },
  { name: 'Storage', value: 'storage', image: require('../assets/icons/place/storage.png') },
  { name: 'Store', value: 'store', image: require('../assets/icons/place/store.png') },
  { name: 'Subway Station', value: 'subway_station', image: require('../assets/icons/place/subway_station.png') },
  { name: 'Synagogue', value: 'synagogue', image: require('../assets/icons/place/synagogue.png') },
  { name: 'Taxi Stand', value: 'taxi_stand', image: require('../assets/icons/place/taxi_stand.png') },
  { name: 'Train Station', value: 'train_station', image: require('../assets/icons/place/train_station.png') },
  { name: 'Transit Station', value: 'transit_station', image: require('../assets/icons/place/transit_station.png') },
  { name: 'Travel Agency', value: 'travel_agency', image: require('../assets/icons/place/travel_agency.png') },
  { name: 'University', value: 'university', image: require('../assets/icons/place/university.png') },
  { name: 'Veterinary Care', value: 'veterinary_care', image: require('../assets/icons/place/veterinary_care.png') },
  { name: 'Zoo', value: 'zoo', image: require('../assets/icons/place/zoo.png') },
];

const placeRadius = [
{ name: '500m', value: 500 },
{ name: '1km', value: 1000 },
{ name: '5km', value: 5000 },
{ name: '10km', value: 10000 },
{ name: '50km', value: 50000 },
{ name: '100km', value: 100000 },
];

const selectedColor = '#FF5252',
  unSelectedColor = '#e5e5e5';

export default class MapScreen extends Component {
    constructor() {
      super();
      this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        //typeModalVisible: false,
        //radiusModalVisible: false,
        filterModalVisible: false,
        locationResult: null,
        currentLat: 0,
        lon: 0,
        _lat: 0,
        _lon: 0,
        radius: 500, // meters
        tmpRadius: 500,
        type: '',
        tmpType: '',
        inputValue: '',
        status: '',
        results: [],
        activeSlide: 0,
      };
      
        this._getLocationAsync = this._getLocationAsync.bind(this);
        this._handleTextChange = this._handleTextChange.bind(this);
        this._handleSubmitText = this._handleSubmitText.bind(this);
    }
    
    getTypeName = (_type) => {
        return placeType.find(
            (place) => {return place.value === _type;}
        ).name;
    }
    
    getRadiusName = (_radius) => {
        return placeRadius.find(
            (place) => {return place.value === _radius;}
        ).name;
    }

    static navigationOptions = {
      header: null,
    };
    setTypeModalVisible(visible) {
        this.setState({ typeModalVisible: visible });
    }
    
    setRadiusModalVisible(visible) {
        this.setState({ radiusModalVisible: visible });
    }
    
    setFilterModalVisible(visible) {
        this.setState({ filterModalVisible: visible });
    }

    componentDidMount() {
        this._getLocationAsync();
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          },
        (error) => console.log('Error message: ' + error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = navigator.geolocation.watchPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          }
        );
        
        // console.log('index: ' + this.state.activeSlide);
        // console.log('lat: ' + this.state._lat);
        // console.log('lon: ' + this.state._lon);
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
          currentLat: location.coords.latitude,
          currentLon: location.coords.longitude,
        });
        //this._getUVIndex(this.state.lat, this.state.lon);
      };
    
      _handleTextChange = inputValue => {
        this.setState({ inputValue });
      };
    
      _handleSubmitText = () => {
        if (this.state.inputValue != '') {
          GoogleMapAPI.nearbysearch(
            this.state.currentLat,
            this.state.currentLon,
            this.state.radius,
            this.state.type,
            this.state.inputValue
          ).then(data => {
            this.setState({
              status: data.status,
              results: data.results,
              _lat: data.results[this.state.activeSlide].geometry.location.lat,
              _lon: data.results[this.state.activeSlide].geometry.location.lng,
              region: {
                latitude: data.results[this.state.activeSlide].geometry.location.lat,
                longitude: data.results[this.state.activeSlide].geometry.location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
              activeSlide: 0,
            });
          });
        }
      };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
      const { navigate, goBack } = this.props.navigation;
        return(
            <View style={{ flex: 1,}}>
            {/*
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
            */}
                <MapView
                    style={ styles.container }
                    showsUserLocation={ true }
                    region={ this.state.region }
                    onRegionChange={ region => this.setState({region}) }
                    onRegionChangeComplete={ region => this.setState({region}) }
                >
                    <MapView.Marker
                    coordinate={ {
                        latitude: this.state._lat, 
                        longitude: this.state._lon, 
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    } }
                    />
                </MapView>

                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, alignItems: 'center', position: 'absolute', top: 40, }}>
                  <TouchableOpacity 
                    onPress={() => goBack()}>
                    <View style={{ flexDirection: 'row', marginRight: 20 }}>
                        <Ionicons name={'md-close'} size={28}/> 
                    </View>
                  </TouchableOpacity>    
                <RkTextInput rkType='searchbox' label={<Ionicons style={[styles.inputIcon, styles.searchIcon]} name='ios-search'/>}
                        style={{paddingRight: 10, flex: 1, }} clearButtonMode='always'
                        
                        ref={input => {
                        this.textInput = input;
                        }}
                        returnKeyType="search"
                        onSubmitEditing={this._handleSubmitText}
                        placeholder="Search places"
                        value={this.state.inputValue}
                        onChangeText={this._handleTextChange}/>
                </View>
                {/*
                <View
                style={{
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    height: 50,
                    width: width,
                    position: 'absolute',
                    top: 80,
                    left: 0,
                }}>
                    <TouchableOpacity
                    style={{flex: 1}}
                    onPress={()=> {
                        this.setTypeModalVisible(!this.state.typeModalVisible);
                        this._handleSubmitText
                    }}>
                        <Text style={{ fontSize: 18, backgroundColor: 'transparent' }}>Type: {this.getTypeName(this.state.type)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{flex: 1}}
                    onPress={()=> {
                        this.setRadiusModalVisible(!this.state.radiusModalVisible);
                        this._handleSubmitText
                    }}>
                        <Text style={{ fontSize: 18, backgroundColor: 'transparent' }}>Radius: {this.getRadiusName(this.state.radius)}</Text>
                    </TouchableOpacity>
                </View>
                */}

                {/* RESULT HERE */}
                <View style={{ height: 300, width: width, position: 'absolute', bottom: 70 }}>
                    <Carousel
                        data={this.state.results}
                        renderItem={({item,index}) => {
                          return(
                            <TouchableOpacity onPress={() => {
                              navigate('PlaceDetail', { placeID: item.place_id });
                            }}>
                              { this._renderResultItem({item,index}) }
                            </TouchableOpacity>
                          );
                        }}
                        sliderWidth={width}
                        itemWidth={400}
                        activeSlideAlignment={'center'}
                        inactiveSlideScale={0.8}
                        inactiveSlideOpacity={0.5}
                        ref={(c) => { this.carousel = c; }}
                        onSnapToItem={(index) => {
                          this.setState({ 
                            activeSlide: index,
                            _lat: this.state.results[index].geometry.location.lat,
                            _lon: this.state.results[index].geometry.location.lng,
                          });
                        } }
                    /> 
                  </View>

                  <KeyboardAvoidingView behavior={'position'}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10, backgroundColor: 'transparent', width: width }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setFilterModalVisible(!this.state.filterModalVisible);
                      }}>
                      <View
                        style={{
                          backgroundColor: '#FF5252',
                          width: 150,
                          height: 50,
                          borderRadius: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: { width: -2, height: 2 },
                          shadowOpacity: 0.1,
                          shadowRadius: 5,
                          elevation: 1,
                        }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>FILTER</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </KeyboardAvoidingView>
                  <Modal isVisible={this.state.filterModalVisible} style={{margin: 20}}>
                    {this._renderModal()}
                  </Modal>
            </View>
        );
    }

    _renderModalContent = () => (
        <SearchPlaceFilter
          onCancelPress={() => {this.setFilterModalVisible(!this.state.filterModalVisible);}}
        />
    );

    _renderResultItem({ item, index }) { 
      var photoURL = 'http://thelabyrinth-a5.com/wp-content/uploads/2015/08/slider-image.jpg';

      if (item.photos) {
        photoURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${item.photos[0].width}&photoreference=${item.photos[0].photo_reference}&key=AIzaSyCKuaY_WP-TZRLarY__psDaVxCFO5ZyQvc`;
      }
      return(
        <View>
          <View
          style={{
            width: 400,
            height: 250,
            marginTop: 20,
            marginBottom: 20,
            padding: 10,
            flexDirection: 'row',
            backgroundColor: 'transparent'
          }}>
          <View style={{ 
            flex: 1, 
            shadowColor: '#000',
            shadowOffset: { width: -2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 1,
            backgroundColor: 'white'
          }}>
            <View style={{ marginLeft: 200, padding: 5, flexDirection: 'column', }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ fontSize: 18, }}>{item.vicinity}</Text>
              <View style={{
                marginTop: 10, 
                flexDirection: 'row',
                flexWrap: 'wrap', }}>
                { item.types.map((t, i) => {
                  return (
                    <View key={i}>
                      <Text style={{ fontSize: 14, fontStyle: 'italic', paddingRight: 5}}>{t}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
          <Image
            source={{ uri: photoURL }}
            style={{
              width: 200,
              height: 250,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              left: 10,
            }}
            resizeMode="cover"
          />
        </View>
      </View>
      );
    }

    _renderModal() {
      return(
          <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 15, }}>
              <View
                  style={{
                      width: window.width,
                      height: 50,
                      marginLeft: 10,
                      marginRight: 10
                  }}>
              <ScrollView 
                  horizontal={true}
                  contentContainerStyle={{
                      alignItems: 'center',
                      justifyContent: 'center',
                  }}>
                  { placeRadius.map((r, i) => {
                      return(
                          <TouchableOpacity key={i} onPress={() => { this.setState({ tmpRadius: r.value }); }}>
                              <View style={{ borderRadius: 20, backgroundColor: (this.state.tmpRadius == r.value ? selectedColor : unSelectedColor) , flexDirection: 'row', alignItems: 'center', height: 40, justifyContent: 'center',  margin: 5, padding: 10}}>
                                  <Text style={{ fontSize: 18, color: (this.state.tmpRadius == r.value ? '#fff' : '#999999') }}>{r.name}</Text>
                              </View>
                          </TouchableOpacity>
                      );
                  })} 
              </ScrollView>
              </View>
              <ScrollView>
                  <GridView
                      itemWidth={120}
                      items={placeType}
                      style={{flex: 1, }}
                      renderItem={item => (  
                          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                              <TouchableOpacity onPress={() => { this.setState({ tmpType: item.value }); }}>
                                  <View style={{ borderRadius: 100, margin: 10, padding: 10, height: 80, width: 80, backgroundColor: (this.state.tmpType == item.value ? selectedColor : unSelectedColor), justifyContent: 'center', alignItems: 'center' }}>
                                  <Image source={item.image} style={{width: 32, height: 32, tintColor: (this.state.tmpType == item.value ? '#fff' : '#999999') }} resizeMode='cover' />
                                  </View>
                              </TouchableOpacity>
                              <Text style={{ fontSize : 16, fontWeight: 'bold',}}>{item.name}</Text>
                          </View>
                      )}/>
              </ScrollView>
              <View style={{ flexDirection:'row', justifyContent: 'space-around' }}>
                  <CustomButton text={'Cancel'} borderColor={'#FF5252'} borderWidth={2} color={'#FF5252'} fontSize={18} width={150} height={50} onPress={() => {
                    this.setFilterModalVisible(!this.state.filterModalVisible);
                    this.setState({
                      tmpRadius: this.state.radius,
                      tmpType: this.state.type,
                    });
                  }}/>
                  <CustomButton text={'OK'} backgroundColor={'#FF5252'} borderWidth={0} color={'#fff'} fontSize={18} width={150} height={50} onPress={() => {
                      let _type = this.state.tmpType;
                      let _radius = this.state.tmpRadius;
                      this.setState({
                        type: _type,
                        tmpType: _type,
                        radius: _radius,
                        tmpRadius: _radius,
                      });
                      this.setFilterModalVisible(!this.state.filterModalVisible);
                      this._handleSubmitText;
                  }}/>
              </View>
          </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
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