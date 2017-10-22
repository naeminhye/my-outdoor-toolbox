import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import ExploreCard from '../components/ExploreCard';

export default class ScreenOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: true,
    };
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
  

  disableScroll() {
    this.setState({ scroll: !this.state.scroll });
  }
  

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView scrollEnabled={this.state.scroll} style={{ marginTop: 20 }}>
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
    </View>
    );
  }
}