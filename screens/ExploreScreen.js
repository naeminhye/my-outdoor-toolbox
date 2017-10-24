import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ScrollView,
  ListView,
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
      dataSource: []
    };

    this.itemRef = firebaseApp.database().ref('explore');
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
  
  listenForEvents(itemRef) {
    itemRef.on('value', snap => {
      let events = [];
      snap.forEach(child => {
        events.push({
          title: child.val().title,
          _key: child.key,
          description: child.val().description,
          content: child.val().content,
          uri: child.val().uri,
          date: child.val().date,
        });
      });

      this.setState({
        dataSource: events,
      });
    });
  }

  componentDidMount() {
    this.listenForEvents(this.itemRef);
  }

  _dueCount(date) {
    let oneDay = 24*60*60*1000;
    let dateOfEvent = new Date(date);
    let today = new Date();
    return Math.round((dateOfEvent.getTime() - today.getTime())/(oneDay));
  }

  _renderItem() {
    return this.state.dataSource.map((event, index) => {
      return(
        <ExploreCard
          key={index}
          title={event.title}
          description={event.description}
          image={{uri: event.uri}}
          color={'#0E48BE'}
          content={event.content}
          onClick={() => this.disableScroll()}
          due={this._dueCount(event.date)}
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
          {this._renderItem()}
      </ScrollView>
      {this.state.scroll == true
        ? <TouchableHighlight
            style={myStyles.addButton}
            underlayColor="#ff7043"
            onPress={() => {
              console.log('Add new event');
            }}>
            <Ionicons name="ios-create-outline" size={30} color="#fff" />
          </TouchableHighlight>
        : null}
    </View>
    );
  }
}