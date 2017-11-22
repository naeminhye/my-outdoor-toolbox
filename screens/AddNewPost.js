import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { Constants } from 'expo';

export default class AddNewPost extends Component {
    static navigationOptions = {
      header: null,
    }

    render() {
        return(
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
                <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Text style={{ fontSize: 20, color: '#FF5252', marginBottom: 10, }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FF5252', marginBottom: 10, }}>Share</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 80, flexDirection:'row' }}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5,}}>
                        <Image style={{borderRadius: 80 / 2}} source={{
                            uri: 'https://i.pinimg.com/736x/fd/7f/7c/fd7f7c072ed1af1af5420658f6245a49--calendar--exo-exo.jpg',
                            width: 80,
                            height: 80 }}
                        />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'space-around', padding: 20, alignContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đỗ Khánh Tú</Text>
                        <Text style={{ fontSize: 16, color: '#ccc' }}>Add tags</Text>
                    </View>
                </View>
            </View>
        );
    }
}