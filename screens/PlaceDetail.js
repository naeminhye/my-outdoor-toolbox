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
  ListView,
} from 'react-native';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GoogleMapAPI from '../GoogleMapAPI';
const STICKY_HEADER_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get('window');

export default class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: 'This place have no opening hours.',
            formatted_address: '',
            photos: [],
            activeSlide: 0,
            rating: 0,
            reviews: [],
            dataSource: ds.cloneWithRows([]),
            starCount: 0,
            voted: false,
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
              formatted_address: data.result.formatted_address,
              rating: data.result.rating,
              reviews: data.result.reviews,
              starCount: data.result.rating,
            });

            if (data.result.opening_hours) {
                if (data.result.opening_hours.open_now)
                    this.setState({
                        status: 'Open Now',
                });
                else {
                    this.setState({
                        status: 'Closed Now',
                    });
                }
            }

            if (data.result.reviews) {
                var reviews = [];
                data.result.reviews.map((re, i) => {
                    reviews.push({
                        author_name: re.author_name,
                        profile_photo_url: re.profile_photo_url,
                        rating: re.rating,
                        relative_time_description: re.relative_time_description,
                        text: re.text,
                    });
                });

                this.setState({
                    //reviews: reviews,
                    dataSource: ds.cloneWithRows(reviews),
                });

                //console.log('reviews: ' + JSON.stringify(this.state.reviews));
            }

            if (data.result.photos) {
                var photoArray = [];
                data.result.photos.map((p, i) => {
                    let uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${p.width}&photoreference=${p.photo_reference}&key=AIzaSyCKuaY_WP-TZRLarY__psDaVxCFO5ZyQvc`;
                    photoArray[i] = uri;
                });

                this.setState({
                    photos: photoArray,
                });
            }
        });

    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating,
            voted: true,
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
                            <Text style={{fontSize: 20, color: 'black', alignItems: 'center',}}>{this.state.rating}</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                emptyStar={'md-star-outline'}
                                fullStar={'md-star'}
                                halfStar={'md-star-half'}
                                iconSet={'Ionicons'}
                                starColor={this.state.voted ? 'yellow' : 'black'}
                            />
                        </View>

                <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: '600', color: '#ff9797'}}>{this.state.status}</Text>
              </View>
              <View style={{ marginBottom: 20 }}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold'}}>Gallery:</Text>
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
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold'}}>Reviews:</Text>
                </View>
                <View>
                { this.state.dataSource.getRowCount() > 0 ? 
                    <ListView
                        style={{ padding: 10 }}
                        dataSource={this.state.dataSource}
                        renderRow={rowData => this._renderReview(rowData)}
                        />
                    : <Text style={{ fontSize: 20, color: '#999', fontWeight: 'bold'}}>No review</Text>
                }
                </View>
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

    _renderReview(rowData) {
        return (
            <View style={{ padding: 10 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 10,
            }}>
            <View style={{
                height: 60,
                width: 60, 
                justifyContent: 'center',
              }}>
                <Image
                    style={{ borderRadius: 60 / 2, width: 60, height: 60 }}
                    resizeMode="cover"
                    source={{uri: rowData.profile_photo_url }}
                />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                flexDirection: 'column',
                justifyContent: 'space-around' 
              }}>
              <Text
                style={{ fontSize: 20}}
                ellipsizeMode="clip"
                numberOfLines={1}>
                {rowData.author_name}
              </Text>
              <Text style={{ fontSize: 18, color: '#D3D3D3' }}
                numberOfLines={1}>{rowData.relative_time_description}</Text>
            </View>
            
          </View>
            <Text style={{ fontSize: 16,}}
                numberOfLines={5}>
                {rowData.text}
            </Text>
          </View>
        );
      }
}