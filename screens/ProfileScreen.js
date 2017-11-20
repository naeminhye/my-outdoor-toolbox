import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  Dimensions,
  StyleSheet,
  FlatList,
  ListItem,
  TouchableOpacity
} from 'react-native';
import {
RkTheme,
RkButton,
RkText,
RkStyleSheet
} from 'react-native-ui-kitten';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Lightbox from 'react-native-lightbox';

const SCREEN_LABEL = 'Profile';
const STICKY_HEADER_HEIGHT = 40;
const AVATAR_SIZE = 100;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this._images = [
      {uri: 'https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=1500&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
      {uri: 'https://images.unsplash.com/photo-1509463542054-6bbf48162621?auto=format&fit=crop&w=1534&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
      {uri: 'https://images.unsplash.com/photo-1509190043825-179c637fdba8?auto=format&fit=crop&w=1500&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
      {uri: 'https://images.unsplash.com/photo-1415902051846-2ad925a71020?auto=format&fit=crop&w=1567&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
      {uri: 'https://images.unsplash.com/photo-1469957761306-556935073eba?auto=format&fit=crop&w=1430&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
      {uri: 'https://images.unsplash.com/photo-1460777037470-0509feac2dc1?auto=format&fit=crop&w=1575&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
      {uri: 'https://images.unsplash.com/photo-1432110847799-39dfbae1299f?auto=format&fit=crop&w=1575&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
      {uri: 'https://images.unsplash.com/photo-1459535653751-d571815e906b?auto=format&fit=crop&w=1498&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
      {uri: 'https://images.unsplash.com/photo-1470274307695-febe05a6dd3d?auto=format&fit=crop&w=1575&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'},
    ];
    this.state = {
      ds: ds.cloneWithRows(this._images),
    };

    let WINDOW_WIDTH = Dimensions.get('window').width,
        WINDOW_HEIGHT = Dimensions.get('window').height;
    this.imgSize = (WINDOW_WIDTH - 16) / 3;
  }
  
  _keyExtractor = (item, index) => item.id;

  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-person' : 'ios-person-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

_renderGallery() {
      return (
        <ListView
          pageSize={3}
          contentContainerStyle={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          // scrollRenderAheadDistance={500}
          dataSource={this.state.ds}
          renderRow={(rowData, sectionID, rowID) => {
            return (
              <View style={{padding: 2, backgroundColor: 'white'}}>
              <Lightbox
              renderHeader={close => (
                <TouchableOpacity onPress={close}>
                  <Text style={{color: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  padding: 8,
                  borderRadius: 3,
                  textAlign: 'center',
                  margin: 10,
                  alignSelf: 'flex-end',}}>Close</Text>
                </TouchableOpacity>
              )}>
                <Image 
                  style={{width: this.imgSize, height: this.imgSize}}
                  source={rowData}
                  index={rowID}
                  />
                  </Lightbox>
                  
              </View>
            )
          }}
        />
      )
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
      <ParallaxScrollView
      ref={(scroll) => { this.scrollview = scroll; }}
      backgroundColor="#fff"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={100}
      stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
      renderForeground={() => (
        <View style={[myStyles.screenHeader]}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
        <Text style={{ fontSize: 22, color: 'blue', marginBottom: 10, }}>Edit</Text>
    </View>
      )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
          onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
        </View>
      )}
      automaticallyAdjustContentInsets={true}>
          <View>
              <View style={{ flexDirection:'row' }}>
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5,}}>
                    <Image style={{borderRadius: AVATAR_SIZE / 2}} source={{
                      uri: 'https://i.pinimg.com/736x/fd/7f/7c/fd7f7c072ed1af1af5420658f6245a49--calendar--exo-exo.jpg',
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE }}
                    />
                  </View>
                  <View style={{ flex: 2, height: 30, flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>9</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center'}}>posts</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>1M</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center'}}>followers</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>0</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center'}}>following</Text>
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: 'space-around', padding: 20, alignContent: 'center', height: 100 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đỗ Khánh Tú</Text>
                <Text style={{ fontSize: 16, color: '#ccc' }}>
                  Yêu màu tím , thích màu hồng, sống nội tâm, hay khóc thầm, ghét sự giả dối.
                </Text>
              </View>
          </View>
          <View style={[UtilStyles.bordered, styles.imagesContainer, { backgroundColor: 'white' }]}>
          <View style={[UtilStyles.rowContainer, {paddingLeft: 2}]}>
            {this._renderGallery()}
          </View>
        </View>
        </ParallaxScrollView>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  imagesContainer: {
    paddingHorizontal: 0
  },
  header: {
    paddingHorizontal: 24,
  },
  dot: {
    fontSize: 6.5,
    marginLeft: 4,
    marginVertical: 6,
    color: theme.colors.text.inverse
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
    color: theme.colors.text.inverse
  },
}));

const UtilStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor :'white'
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'System',
    color: RkTheme.current.colors.text.base
  },
  section: {
    marginTop: 14,
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  bordered: {
    borderTopColor: '#0000001A',
    borderTopWidth: 0.5,
    borderBottomColor: '#0000001A',
    borderBottomWidth: 0.5
  },
  rowContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  columnContainer: {
    marginTop: 16
  },
  spaceAround: {
    marginHorizontal: 5
  },
  spaceH: {
    marginHorizontal: 5
  },
  spaceTop: {
    marginTop: 8
  },
  spaceBottom: {
    marginBottom: 8
  },
  spaceVertical: {
    marginVertical: 8
  },
  description: {
    paddingRight: 10,
    paddingLeft: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1
  },
  exampleView: {
    paddingRight: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1
  },
  text: {
    color: RkTheme.current.colors.text.base,
  },
  codeText: {
    color: RkTheme.current.colors.danger,
  },
  tab: {
    paddingLeft: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  column: {
    flexDirection: 'column'
  },
  tabContent: {
    fontSize: 32,
    alignSelf: 'center',
    padding: 30,
    color: RkTheme.current.colors.grey500
  }
});