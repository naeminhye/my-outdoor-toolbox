import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions, View, Image } from "react-native";
import PropTypes from "prop-types";
import { firebaseApp } from '../FirebaseConfig';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

var timeConverter = timestamp => {
  let date = new Date(timestamp * 1000),
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  let year = date.getFullYear(),
    month = months[date.getMonth()],
    day = date.getDate();
  let hours = date.getHours(),
    minutes = "0" + date.getMinutes(),
    seconds = "0" + date.getSeconds();
  if (hours == 0)
    return (
      day +
      "-" +
      month +
      "-" +
      year +
      " " +
      12 +
      ":" +
      minutes +
      ":" +
      seconds.substr(-2) +
      " AM"
    );
  else if (hours == 12)
    return (
      day +
      "-" +
      month +
      "-" +
      year +
      " " +
      12 +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2) +
      " PM"
    );
  else if (hours < 12)
    return (
      day +
      "-" +
      month +
      "-" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds.substr(-2) +
      " AM"
    );
  else
    return (
      day +
      "-" +
      month +
      "-" +
      year +
      " " +
      (hours - 12) +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2) +
      " PM"
    );
};

export default function CommentItem({
  image = "http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png",
  username = "",
  createdAt = 0,
  text = "",
}) {
  return (
    <View style={{ padding: 10 }} {...this.props}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          padding: 10
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start"
          }}
        >
          <Image
            style={{ borderRadius: 30, width: 60, height: 60 }}
            resizeMode="cover"
            source={{ uri: image }}
          />
        </View>
        <View
          style={{
            flex: 4,
            paddingLeft: 5,
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }} ellipsizeMode="clip" numberOfLines={1}>
            {username}
          </Text>
          <Text style={{ fontSize: 14, color: "#D3D3D3" }} numberOfLines={1}>
            {timeConverter(createdAt)}
          </Text>
          <Text style={{ fontSize: 14 }} numberOfLines={5}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}

CommentItem.propTypes = {
  username: PropTypes.string,
  profile_photo_url: PropTypes.string,
//   createdAt: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func
};
