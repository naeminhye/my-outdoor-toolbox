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

const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Schedule';

export default class ScheduleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { navigate, goBack } = this.props.navigation;
    var today = new Date();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
        <ParallaxScrollView
        ref={(scroll) => { this.scrollview = scroll; }}
        backgroundColor="#fff"
        contentBackgroundColor="#fff"
        parallaxHeaderHeight={100}
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        renderForeground={() => (
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
        )}
          renderStickyHeader={() => (
            <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
              <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
              onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
            </View>
          )}>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Calendar</Text>
        <TouchableOpacity onPress={() => navigate('Agenda')}>
            <Text style={{ fontSize: 16, color: '#FF5252', }}>More</Text>
        </TouchableOpacity>
        </View>
        <Calendar
            onDayPress={this.onDayPress}
            style={styles.calendar}
            markedDates={{[this.state.selected]: {selected: true}}}
            hideArrows={false}
            theme={{
                dotColor: '#FF5252',
                todayTextColor: '#FF5252',
                textMonthFontSize: 20,
                selectedDayBackgroundColor: '#FF5252',
                arrowColor: '#FF5252',
            }}
        /> 
        {/*
        <Agenda
                items={this.state.items}
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
        */}
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Today's <Text style={{color: 'red'}}>Schedule</Text></Text>
        <Text style={{ fontSize: 16, color: '#FF5252', }}>More</Text>
        </View>
        </ParallaxScrollView>
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
      borderRadius: 20,
      shadowColor: '#000', 
      shadowOffset: { width: -2, height: 2 }, 
      shadowOpacity: 0.1, 
      shadowRadius: 5, 
      elevation: 1,
    },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});