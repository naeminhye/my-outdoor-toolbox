import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function CustomButton({ 
	text, 
	backgroundColor = '#FFF', 
	color = '#000', 
	borderWidth = 1, 
  borderColor = '#000', 
  width = WIDTH * 0.8,
  height = HEIGHT * 0.08,
  fontSize = 22,
  gradientColors = ['transparent'],
	onPress}) {
		
	return (
    <TouchableOpacity 
      {...this.props}
      activeOpacity={0.9} 
      style={[styles.button, { backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: borderWidth, width: width, height: height, }]} 
      onPress={onPress}>
        <LinearGradient
            colors={gradientColors}
            start={[1, 1]}
            style={{width: width, height: height, borderRadius: 50, justifyContent: 'center', alignContent: 'center'}}>
          <Text style={[styles.buttonText, { color: color, fontSize: fontSize }]}>{text}</Text>
        </LinearGradient>
    </TouchableOpacity>
	);
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