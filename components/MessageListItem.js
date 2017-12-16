import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
const itemHeight = 80;

export default class MessageListItem extends Component {
    timeConverter = (timestamp) => {
        var today = new Date();
        let date = new Date(timestamp * 1000),
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let	year = date.getFullYear(),
            month = months[date.getMonth()],
            day = date.getDate();
        let hours = date.getHours(),
            minutes = "0" + date.getMinutes();
        
        
        if (hours == 0) {
            return 12 + ':' + minutes + ' AM';
            // return day + '-' + month + '-' + year + ' ' + 12 + ':' + minutes + ':' + seconds.substr(-2) + ' AM';
        }
        else if (hours == 12) {
            return 12 + ':' + minutes.substr(-2) + ' PM';
            //return day + '-' + month + '-' + year + ' ' + 12 + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' PM';
        }
        else if(hours < 12) {
            return hours + ':' + minutes + ' AM';
            //return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds.substr(-2) + ' AM'; 
        }
        else {
            return (hours - 12) + ':' + minutes.substr(-2) + ' PM';
            // return day + '-' + month + '-' + year + ' ' + (hours - 12) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' PM';
        }
    }

  render() {
    return (
      <View
        style={{
          height: itemHeight,
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
                source={{uri: 'https://78.media.tumblr.com/865f4207e818841b80726e56c5c1689b/tumblr_op7fvw7TPE1vfhewmo1_250.png' }}
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
            {this.props.name}
          </Text>
        <Text style={{ fontSize: 16, color: '#D3D3D3',}}
            numberOfLines={1}>
            {this.props.text}
        </Text>
        </View>
        <View style={{ width: 80, justifyContent: 'flex-start'}}>
          <Text style={{ fontSize: 18, color: '#D3D3D3' }}
            numberOfLines={1}>{this.timeConverter(this.props.time)}</Text>
        </View>
      </View>
    );
  }
}
