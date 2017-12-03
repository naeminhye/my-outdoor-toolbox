import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Dimensions,
    Animated
} from 'react-native';
import Animation from 'lottie-react-native';

const window = Dimensions.get('window');

export default class Loading extends Component {
    constructor(props) {
      super(props);
      this.state = {
        progress: new Animated.Value(0),
      };
    }
    
    componentDidMount() {
        this.animation.play();
    }
    
    render() {
        return(
            <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent:'center', alignItems: 'center' }}>
                <View>
                    <Animation 
                    style={{
                        width: 400,
                        height: 300,
                    }} 
                    ref={animation => {
                        this.animation = animation;
                    }}
                    source={require('../assets/lottie/loader.json')} 
                    // progress={this.state.progress} 
                    loop={true} />    
                </View>
                {/* <ActivityIndicator size={'large'} color={'#FF5252'}/> */}
            </View>
        );
    }
}