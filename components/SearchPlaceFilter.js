import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions,
} from 'react-native';
import { Constants, ImagePicker } from 'expo';
import { firebaseApp } from '../FirebaseConfig';
import CustomButton from '../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-super-grid';

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
  { name: '2km', value: 2000 },
  { name: '3km', value: 3000 },
  { name: '5km', value: 5000 },
  { name: '10km', value: 10000 },
  { name: '20km', value: 20000 },
  { name: '30km', value: 30000 },
  { name: '50km', value: 50000 },
  { name: '80km', value: 80000 },
  { name: '100km', value: 100000 },
  { name: '200km', value: 200000 },
  { name: '300km', value: 300000 },
  { name: '500km', value: 500000 },
];

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    'window'
  );

const selectedColor = '#FF5252',
    unSelectedColor = '#e5e5e5';

export default class SearchPlaceFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedType: '',
            selectedRadius: '500'
        };
    }

    render() {
        return(
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Constants.statusBarHeight, }}>
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
                            <TouchableOpacity key={i} onPress={() => { this.setState({ selectedRadius: r.value }); }}>
                                <View style={{ borderRadius: 20, backgroundColor: (this.state.selectedRadius == r.value ? selectedColor : unSelectedColor) , flexDirection: 'row', alignItems: 'center', height: 40, justifyContent: 'center',  margin: 5, padding: 10}}>
                                    <Text style={{ fontSize: 18, color: (this.state.selectedRadius == r.value ? '#fff' : '#999999') }}>{r.name}</Text>
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
                                <TouchableOpacity onPress={() => { this.setState({ selectedType: item.value }); }}>
                                    <View style={{ borderRadius: 100, margin: 10, padding: 10, height: 80, width: 80, backgroundColor: (this.state.selectedType == item.value ? selectedColor : unSelectedColor), justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={item.image} style={{width: 32, height: 32, tintColor: (this.state.selectedType == item.value ? '#fff' : '#999999') }} resizeMode='cover' />
                                        {/*<Ionicons name={item.icon} color={item.code} size={56} />*/}
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ fontSize : 16, fontWeight: 'bold',}}>{item.name}</Text>
                            </View>
                        )}/>
                </ScrollView>
                <View style={{ flexDirection:'row', justifyContent: 'space-around' }}>
                    <CustomButton text={'Cancel'} borderColor={'#FF5252'} borderWidth={2} color={'#FF5252'} fontSize={18} width={150} height={50} onPress={this.props.onCancelPress}/>
                    <CustomButton text={'Next'} backgroundColor={'#FF5252'} borderWidth={0} color={'#fff'} fontSize={18} width={150} height={50} onPress={() => {
                        console.log('Selected');
                        this.props.onCancelPress();
                    }}/>
                </View>
            </View>
        );
    }
}
