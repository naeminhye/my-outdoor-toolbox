import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SlidingUpPanel from 'rn-sliding-up-panel';

import PropTypes from "prop-types";
var { width, height } = Dimensions.get('window');

export default class MessageSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelVisible: false,
    }
  }

  render() {
    let { closeDrawer } = this.props;
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "#f5f4f2"
        }}
      >
        <View
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity onPress={closeDrawer}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name={"ios-arrow-back"} size={28} />
              <Text style={{ fontSize: 20 }}> Back</Text>
            </View>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
            Details
          </Text>
          <View />
        </View>
        <View style={{ flex: 1, backgroundColor: "pink", justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.setState({panelVisible: true})}>
            <Text>Change Color</Text>
          </TouchableOpacity>
        </View>
        <SlidingUpPanel
          allowDragging={false}
          ref={c => this._panel = c}
          visible={this.state.panelVisible}
          onRequestClose={() => this.setState({panelVisible: false})}>
          <View style={{
            flex: 1,
            // height: height / 2,
            marginTop: height / 2,
            backgroundColor: '#fff',
            justifyContent: 'center', alignItems: 'center' 
          }}>
          <TouchableOpacity onPress={() => this.setState({panelVisible: false})}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

MessageSetting.propTypes = {
  closeDrawer: PropTypes.func.isRequired
};
