import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GoogleMapAPI from '../GoogleMapAPI';
const STICKY_HEADER_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
import Carousel from 'react-native-snap-carousel';

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get('window');

export default class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            open_now: false,
            formatted_address: '',
            photos: [],
            activeSlide: 0,
            rating: 0,
            reviews: [],
        };
    }

    static navigationOptions = {
        header: null,
      }

    componentDidMount() {
        const { params } = this.props.navigation.state;

        GoogleMapAPI.placedetails(params.placeID).then(data => {
            this.setState({
              name: data.result.name,
              open_now: data.result.opening_hours.open_now,
              formatted_address: data.result.formatted_address,
              rating: data.result.rating,
              reviews: data.result.reviews,
            });

            if (data.result.opening_hours) {
                this.setState({
                    open_now: data.result.opening_hours.open_now,
                });
            }

            if (data.result.photos) {
                var photoArray = [];
                data.result.photos.map((p, i) => {
                    let uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${p.width}&photoreference=${p.photo_reference}&key=AIzaSyCKuaY_WP-TZRLarY__psDaVxCFO5ZyQvc`;
                    // photoArray.push({
                    //     uri: uri,
                    // });
                    photoArray[i] = uri;
                    //console.log('[' + i + ']: ' + uri);
                });

                // data.result.photos.forEach(photo => {
                //     let uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photo.width}&photoreference=${photo.photo_reference}&key=AIzaSyCKuaY_WP-TZRLarY__psDaVxCFO5ZyQvc`;
                //     photoArray.push({
                //         uri: uri,
                //     });
                // });

                this.setState({
                    photos: photoArray,
                });
                //console.log('photos: ' + JSON.stringify(this.state.photos));
            }
        });

    }

    render() {
        const { goBack } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <ParallaxScrollView
                ref={(scroll) => { this.scrollview = scroll; }}
              backgroundColor="white"
              stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
              parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
              backgroundSpeed={10}
              renderBackground={() => (
                <View>
                    <Image source={{
                        uri: (this.state.photos ? this.state.photos[0] : 'https://cdnimg.melon.co.kr/cm/album/images/101/22/917/10122917_1000.jpg'), 
                        width: SCREENWIDTH,
                        height: PARALLAX_HEADER_HEIGHT}}/>
                    <View style={{position: 'absolute',
                        top: 0,
                        width: SCREENWIDTH,
                        backgroundColor: 'transparent',
                        height: PARALLAX_HEADER_HEIGHT}}/>
                </View>
              )}
              renderForeground={() => (
                <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: Constants.statusBarHeight, }}>
                    <View 
                        style={{width: SCREENWIDTH, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', }}>
                        <TouchableOpacity 
                            onPress={() => goBack()}>
                            <View style={{ flexDirection: 'row', marginTop: 30, margin: 20 }}>
                                <Ionicons name={'ios-arrow-back'} size={28} color={'#fff'}/> 
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white',}}> Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: 'white'}}>{this.state.name}</Text>
                </View>
              )}
              renderStickyHeader={() => (
                <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
                    onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{this.state.name}</Text>
                </View>
              )}>
                <View style={{ flex: 1, padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10, textAlign: 'center'}}>{this.state.formatted_address}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 10 }}> 
                            <Text style={{fontSize: 20, color: 'black', alignItems: 'center',}}>something</Text>
                            <Text style={{fontSize: 20, color: 'black',}}>something</Text>
                        </View>

                <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: '600', color: '#ff9797'}}>{this.state.open_now ? 'Open now' : 'Closed now'}</Text>
                <Text style={{ fontSize: 20}}>something</Text> 
              </View>
              <View style={{ height: 300, width: SCREENWIDTH }}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 20}}>Gallery:</Text> 
                </View>
                    <Carousel
                        data={this.state.photos}
                        renderItem={this._renderResultItem}
                        sliderWidth={SCREENWIDTH}
                        itemWidth={180}
                        activeSlideAlignment={'start'}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                        ref={(c) => { this.carousel = c; }}
                        onSnapToItem={(index) => {
                            this.setState({ 
                            activeSlide: index,
                            });
                        }}
                    /> 
                </View>

                {/* REVIEWS HERE */} 
            </ParallaxScrollView>
            </View>
        ); 
    }

    _renderResultItem({ item, index }) { 
        return(
            <View style={{
                width: 170,
                height: 150,
                borderRadius: 20,
                margin: 5,
                }}>
                <Image
                    source={{ uri: item }}
                    style={{
                        width: 170,
                        height: 150,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 10,
                        borderRadius: 20,
                    }}
                    resizeMode="cover"
                />
            </View>
        );
    }
}