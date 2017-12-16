import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Agenda, Calendar, CalendarList } from 'react-native-calendars';
import myStyles from '../assets/styles/myStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Timeline from 'react-native-timeline-listview';
import { firebaseApp } from '../FirebaseConfig';

const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Agenda';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agenda: null,

      items: {
          "2017-12-25": [
            {
                "name": "Đi chơi Noel",
            },
            {
                "name": "Ôn thi",
            },
          ]
      },
      data: [
        {time: '09:00', state: 'done', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', icon: require('../assets/icons/task-done.png')},
        {time: '10:45', state: 'undone', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', icon: require('../assets/icons/task-undone.png')},
        {time: '12:00', state: 'undone', title: 'Lunch', icon: require('../assets/icons/task-undone.png')},
        {time: '14:00', state: 'undone', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688', icon: require('../assets/icons/task-done.png')},
        {time: '16:30', state: 'done', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', icon: require('../assets/icons/task-done.png')}
      ]
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  
  static navigationOptions = {
    header: null,
}

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
    }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user != null) {
        var userRef = firebaseApp.database().ref('users/' + user.uid + '/agenda/');
        userRef.on('value', snap => {
          this.setState({
            agenda: snap
          });
        });
      } else {
        console.log('user is null');
      }
    });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    var today = new Date();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
        <View  style={{ flexDirection: 'column', paddingTop: 25 }}>
        <TouchableOpacity 
          onPress={() => goBack()}>
          <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
              <Ionicons name={'ios-arrow-back'} size={28}/> 
              <Text style={{fontSize: 20, fontWeight: 'bold',}}> Back</Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingTop: 5, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row'}}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
          <TouchableOpacity onPress={()=>{ console.log('Edit'); }}>
            <Text style={{ fontSize: 20, color: '#FF5252', marginBottom: 10, }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Calendar</Text>
        <TouchableOpacity>
            <Text style={{ fontSize: 16, color: '#FF5252', }}>More</Text>
        </TouchableOpacity>
        </View>
        <Agenda
                items={this.state.agenda}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={this.formatDate(today)}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                theme={{
                    agendaTodayColor: '#FF5252',
                    agendaKnobColor: '#000',
                    dotColor: '#FF5252',
                    todayTextColor: '#FF5252',
                    textMonthFontSize: 20,
                }}
            />
        <TouchableOpacity onPress={() => {}}>
            <View style={{ backgroundColor: '#FF5252', width: 60, height: 60, borderRadius:30, position: 'absolute', bottom: 30, right: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 1,}}>
                <Ionicons name={'md-add'} size={32} color={'#FFF'} />
            </View>
        </TouchableOpacity>
        </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        console.log(this.state.agenda);
        if (!this.state.agenda[strTime]) {
          this.state.agenda[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            // this.state.items[strTime].push({
            //   name: 'Item for ' + strTime,
            //   height: Math.max(50, Math.floor(Math.random() * 150))
            // });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.agenda).forEach(key => {newItems[key] = this.state.agenda[key];});
      this.setState({
        //items: newItems,
        agenda: newItems,
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={{height: 100, flexDirection: 'row', borderRadius: 10, marginRight: 10, marginTop: 17}}>
        <View style={{ backgroundColor: 'red', width: 5, height: 100}}></View>
        <View style={styles.item}><Text>{item.name}</Text></View>
        
      </View>
    );
  }

  renderEmptyDate() {
    return (
        <View style={[styles.emptyDate, {height: 50}]}><Text style={{fontSize: 18}}>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
    calendar: {
      borderTopWidth: 1,
      paddingTop: 5,
      borderBottomWidth: 1,
      borderColor: '#eee',
      margin: 10,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: -5, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 1,
    },
  item: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});