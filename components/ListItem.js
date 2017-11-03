import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ListItem extends Component {

  componentDidMount() {
    //alert(Dimensions.get('window').height)
  }

  render() {
        return (
      <View style={styles.projectRow}>
        <View style={styles.projectText}>
          <Text style={styles.itemName}>{this.props.name}</Text>
          <Text style={styles.itemDetails}>{this.props.vicinity}</Text>
        </View>
        <View style={styles.moreContainer}>
          <Ionicons name="ios-arrow-forward" size={15} style={styles.moreIcon} />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  projectText: {
    flex: 1,
    flexDirection: 'column'
  },

  projectRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },

   itemName: {
     fontSize: 22,
     color: '#007aff',
     fontWeight: 'bold'
   },

   itemDetails: {
     fontSize: 16,
     color: '	#8e8e93',
   },

   moreContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

   moreIcon: {
     color: "#222222"
   }
});
