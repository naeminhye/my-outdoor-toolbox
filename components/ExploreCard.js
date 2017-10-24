/**
 * Inspired from ggoma's card-modal
 */
import React, { Component } from 'react';
import {
  Animated,
  ActivityIndicator,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'; // 4.4.2

const { width, height } = Dimensions.get('window');

export default class ExploreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedStyle: {},

      org_width: width - 32,
      org_height: height / 5,

      top_width: new Animated.Value(width - 32),
      top_height: new Animated.Value(height / 5),
      bottom_width: new Animated.Value(width - 32),
      bottom_height: new Animated.Value(height / 6),
      content_height: new Animated.Value(0),

      top_pan: new Animated.ValueXY(),
      bottom_pan: new Animated.ValueXY(),
      content_pan: new Animated.ValueXY(),

      content_opac: new Animated.Value(0),
      button_opac: new Animated.Value(0),
      back_opac: new Animated.Value(0),
      plus: new Animated.Value(1),

      TopBorderRadius: 5,
      BottomBorderRadius: 0,

      activate: 'Join',
      activated: false,

      offset: 0,

      pressed: false,
    };

    this._onPress = this._onPress.bind(this);
    this.calculateOffset = this.calculateOffset.bind(this);
    this.activate = this.activate.bind(this);
  }

  _onPress() {
    this.props.onClick();
    this.setState({ pressed: !this.state.pressed });
    this.calculateOffset();
  }

  grow() {
    this.setState({ TopBorderRadius: 0, BottomBorderRadius: 5 });

    Animated.parallel([
      Animated.spring(this.state.top_width, {
        toValue: width,
      }).start(),
      Animated.spring(this.state.top_height, {
        toValue: height / 3,
      }).start(),
      Animated.spring(this.state.bottom_height, {
        toValue: height / 6 + 50,
      }).start(),
      Animated.spring(this.state.content_height, {
        toValue: height / 2,
      }).start(),
      Animated.spring(this.state.top_pan, {
        toValue: {
          x: 0,
          y: -this.state.offset,
        },
      }).start(),
      Animated.spring(this.state.content_pan, {
        toValue: {
          x: 0,
          y: -(height / 8 + this.state.offset),
        },
      }).start(),
      Animated.spring(this.state.bottom_pan, {
        toValue: {
          x: 0,
          y: -(50 + this.state.offset),
        },
      }).start(),

      Animated.timing(this.state.content_opac, {
        toValue: 1,
      }).start(),
      Animated.timing(this.state.button_opac, {
        toValue: 1,
      }).start(),
      Animated.timing(this.state.back_opac, {
        toValue: 1,
      }).start(),
      Animated.timing(this.state.plus, {
        toValue: 0,
      }).start(),
    ]);
  }

  shrink() {
    this.setState({ TopBorderRadius: 5, BottomBorderRadius: 0 });
    Animated.parallel([
      Animated.spring(this.state.top_width, {
        toValue: this.state.org_width,
      }).start(),
      Animated.spring(this.state.top_height, {
        toValue: this.state.org_height,
      }).start(),
      Animated.spring(this.state.bottom_height, {
        toValue: height / 6,
      }).start(),
      Animated.spring(this.state.top_pan, {
        toValue: {
          x: 0,
          y: 0,
        },
      }).start(),
      Animated.spring(this.state.bottom_pan, {
        toValue: {
          x: 0,
          y: 0,
        },
      }).start(),
      Animated.spring(this.state.content_height, {
        toValue: 0,
      }).start(),
      Animated.timing(this.state.content_opac, {
        toValue: 0,
      }).start(),
      Animated.timing(this.state.button_opac, {
        toValue: 0,
      }).start(),
      Animated.timing(this.state.back_opac, {
        toValue: 0,
      }).start(),
      Animated.timing(this.state.plus, {
        toValue: 1,
      }).start(),
    ]);
  }

  calculateOffset() {
    if (this.container) {
      this.container.measure((fx, fy, width, height, px, py) => {
        this.setState({ offset: py }, () => {
          if (this.state.pressed) {
            //console.log('growing with offset', this.state.offset);
            this.grow();
          } else {
            //console.log('shrinking with offset', this.state.offset);
            this.shrink();
          }
        });
      });
    }
  }

  activate() {
    this.setState({ activate: 'loading' });
    setTimeout(() => {
      this.setState({
        activate: <Text>Joined <Icon name="ios-checkmark-circle" size={20} color='#fff'/></Text>,
        activated: true,
      });
    }, 1500);
  }

  renderTop() {
    var back = this.state.pressed
      ? <TouchableOpacity style={styles.backButton} onPress={this._onPress}>
          <Animated.View>
              <Icon name='ios-arrow-back-outline' size={40} color='#fff' />
          </Animated.View>
        </TouchableOpacity>
      : <View />;

    var borderStyles = (!this.state.pressed)
      ? { borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 0,
          borderBottomLeftRadius: 0, }
      : {
          borderTopRightRadius: this.state.TopBorderRadius,
          borderTopLeftRadius: this.state.TopBorderRadius,
        };
    return (
      <Animated.Image
        source={this.props.image}
        style={[
          styles.top,
          
          {
            width: this.state.top_width,
            height: this.state.top_height,
            transform: this.state.top_pan.getTranslateTransform(),
          },
        ]}>
        {back}
      </Animated.Image>
    );
  }

  renderBottom() {
    var loading = this.state.activate == 'loading'
      ? <ActivityIndicator animating={true} color="white" />
      : <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>
          {this.state.activate}
        </Text>;

    var button = this.state.pressed
      ? <TouchableOpacity onPress={this.activate}>
          <Animated.View
            style={{
              opacity: this.state.button_opac,
              backgroundColor: this.props.color,
              marginTop: 10,
              borderRadius: 10,
              width: width - 64,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {loading}
          </Animated.View>

        </TouchableOpacity>
      : null;

    var plusButton = !this.state.activated
      ? <Animated.View
          style={{
            opacity: this.state.plus,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="ios-add-circle-outline"
            size={30}
            color={this.props.color}
          />
        </Animated.View>
      : <Animated.View
          style={{
            opacity: this.state.plus,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="ios-checkmark-circle"
            size={30}
            color={this.props.color}
          />
        </Animated.View>;

    return (
      <Animated.View
        style={[
          styles.bottom,
          {
            width: this.state.bottom_width,
            height: this.state.bottom_height,
            borderRadius: this.state.BottomBorderRadius,
            transform: this.state.bottom_pan.getTranslateTransform(),
            borderColor: this.props.color
          },
        ]}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 4 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', paddingBottom: 8, color: this.props.color }}>
              {this.props.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: 'gray',
                paddingBottom: 10,
              }}
              numberOfLines={1}>
              {this.props.description}
            </Text>
            { this.props.due >= 0 ? (<Text style={{ fontSize: 12, fontWeight: '500', color: 'gray' }}>
              Happens in {this.props.due} days
            </Text>) : (<Text style={{ fontSize: 12, fontWeight: '500', color: 'gray' }}>This event has expired.</Text>)}
          </View>
          {plusButton}
        </View>
        {button}
      </Animated.View>
    );
  }

  renderContent() {
    if (!this.state.pressed) {
      return;
    }
    return (
      <Animated.View
        style={{
          opacity: this.state.content_opac,
          marginTop: 40,
          width: width,
          height: this.state.content_height,
          zIndex: -1,
          backgroundColor: '#fff',
          transform: this.state.content_pan.getTranslateTransform(),
          paddingBottom: 65,
        }}>

        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            flex: 1,
            margin: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: this.props.color,
          }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: this.props.color, }}>
            Description
          </Text>
          <Text style={{ color: 'gray', paddingTop: 10 }} numberOfLines={8}>
            {this.props.content}
          </Text>
          <TouchableOpacity>
            <Animated.View
              style={{
                opacity: this.state.button_opac,
                backgroundColor: this.props.color,
                marginTop: 10,
                borderRadius: 10,
                width: width - 64,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>See Event Detail</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

      </Animated.View>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.state.pressedStyle]}>
        <TouchableWithoutFeedback
          onPress={!this.state.pressed ? this._onPress : null}>
          <View
            ref={_container => {
              this.container = _container;
            }}
            style={{ alignItems: 'center', paddingBottom: 20 }}>
            {this.renderTop()}
            {this.renderBottom()}
            {this.renderContent()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  top: {
    marginBottom: 0,
    backgroundColor: '#ccc',
  },
  bottom: {
    marginTop: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  backButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 32,
    left: 10,
    padding: 10,
  },
});
