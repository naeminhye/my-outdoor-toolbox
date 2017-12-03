import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Timeline from 'react-native-timeline-listview'
import myStyles from '../assets/styles/myStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'My Schedule';

export default class ScheduleScreen extends Component {
  constructor(){
    super()
    this.data = [
      {time: '09:00', state: 'done', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', icon: require('../assets/icons/task-done.png')},
      {time: '10:45', state: 'undone', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', icon: require('../assets/icons/task-undone.png')},
      {time: '12:00', state: 'undone', title: 'Lunch', icon: require('../assets/icons/task-undone.png')},
      {time: '14:00', state: 'undone', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688', icon: require('../assets/icons/task-done.png')},
      {time: '16:30', state: 'done', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', icon: require('../assets/icons/task-done.png')}
    ]
  } 
  
    static navigationOptions = {
        header: null,
        tabBarLabel: SCREEN_LABEL,
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-notifications' : 'ios-notifications-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
    }

  render() {
    const { navigate, goBack } = this.props.navigation;
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
        <Timeline 
            style={{flex: 1, marginTop:20, padding: 20, }}
            data={this.data}
            circleSize={30}
            circleColor='rgba(0,0,0,0)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{ minWidth: 65, marginTop: -5, borderRadius:50}}
            timeStyle={{textAlign: 'center', fontSize: 18, backgroundColor:'transparent', color:'black', padding:5,}}
            descriptionStyle={{color:'gray'}}
            options={{
                style:{paddingTop:5}
            }}
            innerCircle={'icon'}
            separator={false}
            detailContainerStyle={{marginBottom: 20, padding: 20, backgroundColor: "#BBDAFF", borderRadius: 20, shadowColor: '#000', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 1,}}
        />
        </ParallaxScrollView>
      </View>
    );
  }
}