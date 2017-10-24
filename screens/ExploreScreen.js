import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import ExploreCard from '../components/ExploreCard';
import { firebaseApp } from '../FirebaseConfig';

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: true,
      events: [],
    };
    //this.itemRef = firebaseApp.database().ref('explore');

    //this.renderEvents = this.renderEvents.bind(this);
  }
  
  static navigationOptions = {
    header: null,
    //title: 'Explore',
    tabBarLabel: 'Explore',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-compass' : 'ios-compass-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }
  
  // listenForEvents(itemRef) {
  //   itemRef.on('value', snap => {
  //     let events = [];
  //     snap.forEach(child => {
  //       events.push({
  //         title: child.val().title,
  //         _key: child.key,
  //         description: child.val().description,
  //       });
  //     });
  //     this.setState({
  //       events: events,
  //     });
  //   });
  // }

  renderEvents() {
    return this.state.events.map((event, index) => {
      return(
        <CardModal
          key={index}
          title={event.title}
          description={event.description}
          image={{
            uri: 'https://www.theurbanlist.com/content/article/things-to-do-in-auckland-1_1.jpg',
          }}
          color={'#0E48BE'}
          content={
            'What started small, with a single discount store and the simple idea of selling more for less, has grown over the last 50 years into the largest retailer in the world. Today, nearly 260 million customers visit our more than 11,500 stores under 63 banners in 28 countries and e-commerce sites in 11 countries each week. With fiscal year 2016 revenue of $482.1 billion, Walmart employs 2.3 million associates worldwide – 1.5 million in the U.S. alone. It’s all part of our unwavering commitment to creating opportunities and bringing value to customers and communities around the world.'
          }
          onClick={() => this.disableScroll()}
          due={3}
        />
        );
    });
  }  

  disableScroll() {
    this.setState({ scroll: !this.state.scroll });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView scrollEnabled={this.state.scroll} style={{ marginTop: Constants.statusBarHeight, }}>
          <View style={myStyles.screenHeader}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>Explore</Text>
          </View>
          <ExploreCard
            title={'Color Me Run'}
            description={'Quẩy bôn lành cùng Color Me Run tại TP Hồ Chí Minh'}
            image={{uri: 'https://www.theurbanlist.com/content/article/things-to-do-in-auckland-1_1.jpg'}}
            color={'#0E48BE'}
            content={
              'Đường chạy sắc màu là sự kiện thể thao sống động và độc đáo nhất Việt Nam. Tham gia sự kiện, bạn sẽ được trải nghiệm chặng đường mới lạ khi được tung phủ bột màu từ đầu đến chân qua các điểm mốc khác nhau. Hãy cùng trải nghiệm, chia sẻ những khoảnh khắc tuyệt vời cùng gia đình và bạn bè tại một trong những sự kiện thể thao sắc màu độc đáo nhất Việt Nam. La Vie Color Me Run chắc chắn sẽ là ngày hội cuối tuần đáng nhớ nhất trong năm của bạn.'
            }
            onClick={() => this.disableScroll()}
            due={3}
          />
          <ExploreCard
            title={'EXO Concert 2018'}
            description={'Lần đầu tiên EXO tổ chức Concert tại Việt Nam'}
            image={{uri: 'https://saokpop.com/wp-content/uploads/2017/02/exo-concert.jpg'}}
            color="#662BAB"
            content={
              'Trời ơi EXO về Việt Nam diễn Concert kìa mấy má!!!!! Mau mau bán thận mà mua vé đi coi đi, lẹ lẹ kẻo cháy vé trong chưa đầy 1 phút đó!!!!'
            }
            onClick={() => this.disableScroll()}
            due={5}
          />
          <ExploreCard
            title={'Đường hoa Nguyễn Huệ'}
            description={'Đường hoa Tết TP HCM dời về phố đi bộ Nguyễn Huệ.'}
            image={{uri: 'https://thuvienhoasen.org/images/file/0DuHB3tF1AgBABQf/duong-hoa-nguyen-hue-2017-15.jpg'}}
            color={'#fc3758'}
            content={
              'In December 2014, Walgreens completed its strategic combination with Alliance Boots to establish Walgreens Boots Alliance, Inc., forging the first global pharmacy-led, health and wellbeing enterprise. The combination brought together two leading companies with iconic brands, complementary geographic footprints, shared values and a heritage of trusted health care services through community pharmacy care and pharmaceutical wholesaling.  Both companies have more than a century’s worth of experience in customer and patient care. Walgreens is today part of the Retail Pharmacy USA division of Walgreens Boots Alliance.'
            }
            onClick={() => this.disableScroll()}
            due={4}
          />
          <ExploreCard
            title={'Hội Phượt ĐHQG'}
            description={'Blah Blah Blah'}
            image={{uri: 'https://dulichbaitho.com/wp-content/uploads/2016/12/diphuot.jpg'}}
            color="black"
            content={
              'Apple is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.'
            }
            onClick={() => this.disableScroll()}
            due={1}
          />
      </ScrollView>
      {this.state.scroll == true
        ? <TouchableHighlight
            style={myStyles.addButton}
            underlayColor="#ff7043"
            onPress={() => {
              console.log(this.state.scroll);
            }}>
            <Ionicons name="ios-create-outline" size={30} color="#fff" />
          </TouchableHighlight>
        : null}
    </View>
    );
  }
}