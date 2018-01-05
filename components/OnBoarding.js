import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { DangerZone } from 'expo';
import PropTypes from "prop-types";

import {
  Card,
  Header,
  Actions,
  ContentContainer,
  GradientBackgrounds,
} from 'react-native-onboarding-component';

const { Lottie } = DangerZone;

const { width: deviceWidth } = Dimensions.get('window');

const pages = [{
  title: 'Cheap Travel',
  description: 'Save money on your trip by finding the best priced flight tickets available.',
  backgroundColor: '#b2deff',
  source: require('../assets/lottie/cycle_animation.json'),
  width: 320,
  height: 260,
}, {
  title: 'Go everywhere',
  description: 'See everywhere without having to worry about planning and transportation.',
  backgroundColor: '#d6f6ff',
  source: require('../assets/lottie/location_pin.json'),
  width: 300,
  height: 300,
}, {
  title: 'Stay warm',
  description: "Don't like the cold wheather? We guarantee you a sunny and warm vacation.",
  backgroundColor: '#f2e3ff',
  source: require('../assets/lottie/done.json'),
  width: 300,
  height: 300,
}, {
  title: 'Amazing hotels',
  description: 'Make sure you stay in the best hotels for the best prices that are available.',
  backgroundColor: '#ffbddb',
  source: require('../assets/lottie/emoji_wink.json'),
  width: 300,
  height: 300,
}];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'transparent',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    marginBottom: 30,
    color: 'black',
  },
  description: {
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
  },
});

export default class OnBoarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
    this.lastIndex = pages.length - 1;
    this.scrollX = new Animated.Value(0);
    this.animations = new Map();
    this.onStart = this.onStart.bind(this);
  }

  componentDidMount() {
    this.animations.get(this.state.currentIndex).play();
  }

  onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / deviceWidth);
    if (this.state.currentIndex !== currentIndex) {
      this.animations.forEach((animation) => {
        animation.reset();
      });
      this.animations.get(currentIndex).play();
      this.setState({ currentIndex });
    }
  }

  scrollTo = (index) => {
    this.scrollView._component.scrollTo({
      x: (deviceWidth * index),
      animated: true,
    });
  }

  onStart() {
    //   console.log(this.props.onStart != undefined ? 'true' : 'false');
    //   console.log('huhu');    
    this.props.onPress
  }

  render() {
    return (
      <View style={styles.container}>
        <GradientBackgrounds
          colors={pages.map(page => page.backgroundColor)}
          scrollX={this.scrollX}
          style={{ height: '100%' }}
        />
        <Animated.ScrollView
          horizontal
          ref={(scrollView) => { this.scrollView = scrollView; }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: true,
              listener: this.onScroll,
            },
          )}
        >
          {pages.map((page, index) => (
            <View
              key={`pages-${index}`}
              style={[styles.card, { width: deviceWidth, flexDirection: 'column' }]}
            >
            <Header style={{}}>
                <Card
                  scrollX={this.scrollX}
                  index={index}
                  style={{ borderRadius: 0, backgroundColor: 'transparent' }}
                >
                  <Lottie
                    ref={(animation) => {
                      if (animation) {
                        this.animations.set(index, animation);
                      }
                    }}
                    style={{width: page.width, height: page.height, marginTop: 50}}
                    source={page.source}
                  />
                </Card>
                </Header>
              
                  <ContentContainer style={{ backgroundColor: 'transparent'}}>
                    <Text style={styles.title}>
                    {page.title}
                    </Text>
                    <Text style={styles.description}>
                    {page.description}
                    </Text>
                 </ContentContainer>
                 
                <View style={{ backgroundColor: 'transparent', height: 110, justifyContent: 'center', alignItems: 'center'}}>
                 <TouchableOpacity
                    onPress={(this.state.currentIndex < this.lastIndex) ? () => {
                        const next = index + 1;
                        if(index + 1 < pages.length) {
                            this.scrollTo(next);
                        }
                    } : this.props.onPress}>
                    <View style={{ backgroundColor: 'transparent', borderRadius: 50, borderWidth: 2, borderColor: '#fff', width: 120, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color: '#fff'}}>
                        {(this.state.currentIndex < this.lastIndex) ? 'Continue' : 'Get Started'}
                    </Text>
                    </View>
                    </TouchableOpacity>
                    </View>
              {/*<Actions
                actions={[{
                  style: { color: page.backgroundColor, backgroundColor: 'transparent', borderRadius: 50, borderWidth: 2, borderColor: '#fff', width: 100, height: 40 },
                  title: (this.state.currentIndex < this.lastIndex) ? 'Continue' : 'Get Started',
                  onPress: (this.state.currentIndex < this.lastIndex) ? () => {
                        const next = index + 1;
                        if(index + 1 < pages.length) {
                            this.scrollTo(next);
                        }
                    } : this.props.onPress,
                }]}
              />*/}
              </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

OnBoarding.propTypes = {
    onPress: PropTypes.func
};
  