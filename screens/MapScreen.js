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
    Image,
    Dimensions,
} from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import {RkText, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoogleMapAPI from '../GoogleMapAPI';
import Carousel from 'react-native-snap-carousel';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
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
        typeModalVisible: false,
        radiusModalVisible: false,
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
    };
    setTypeModalVisible(visible) {
        this.setState({ typeModalVisible: visible });
    }
    
    setRadiusModalVisible(visible) {
        this.setState({ radiusModalVisible: visible });
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
        
        console.log('index: ' + this.state.activeSlide);
        console.log('lat: ' + this.state._lat);
        console.log('lon: ' + this.state._lon);
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
            }
          });
        });
      };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
      const { navigate, goBack } = this.props.navigation;
        return(
            <View style={{ flex: 1,}}>
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
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
                        <Ionicons name={'ios-arrow-back'} size={28}/> 
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
                    }}>
                        <Text style={{ fontSize: 18, backgroundColor: 'transparent' }}>Type: {this.getTypeName(this.state.type)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{flex: 1}}
                    onPress={()=> {
                        this.setRadiusModalVisible(!this.state.radiusModalVisible);
                    }}>
                        <Text style={{ fontSize: 18, backgroundColor: 'transparent' }}>Radius: {this.getRadiusName(this.state.radius)}</Text>
                    </TouchableOpacity>
                </View>

                {/* RESULT HERE */}
                <View style={{ height: 300, width: width, position: 'absolute', bottom: 20 }}>
                    <Carousel
                        data={this.state.results}
                        renderItem={this._renderResultItem}
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
            </View>
        );
    }

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
          <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 10,
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
          <TouchableOpacity onPress={() => {
            console.log('Shared');
          }}>
              <Ionicons name={'ios-share-outline'} size={25}/>
          </TouchableOpacity>
          <Text style={{ fontSize: 16 }}>Share</Text>
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