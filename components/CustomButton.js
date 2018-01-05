import React from 'react';
import { Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default class CustomButton extends React.Component{
  constructor(props) {
    super(props);

    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }
  
  handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: .8
    }).start()
  }
  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start()
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }
    return (
      <TouchableOpacity 
        activeOpacity={0.9} 
        style={[styles.button, { backgroundColor: this.props.backgroundColor, borderColor: this.props.borderColor, borderWidth: this.props.borderWidth, width: this.props.width, height: this.props.height, }]} 
        onPress={this.props.onPress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}>
        <Animated.View style={[{width: this.props.width, height: this.props.height,}, animatedStyle]}>
          <LinearGradient
            colors={this.props.gradientColors}
            start={[1, 1]}
            style={{ flex:1, borderRadius: 50, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={[styles.buttonText, { color: this.props.color, fontSize: this.props.fontSize }]}>{this.props.text}</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
  borderWidth: PropTypes.number,
  onPress: PropTypes.func,
  gradientColors: PropTypes.array
};

CustomButton.defaultProps = {
	backgroundColor: '#FFF', 
	color: '#000', 
	borderWidth: 1, 
  borderColor: '#000', 
  width: WIDTH * 0.8,
  height: HEIGHT * 0.08,
  fontSize: 22,
  gradientColors: ['transparent'],
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    //borderWidth: 2,
    //backgroundColor: '#FFF',
    //borderColor: '#B9A8FF',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    fontWeight: '200',
    //color: '#B9A8FF',
  },
});

