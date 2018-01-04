import React from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    Image,

} from 'react-native';

import PropTypes from 'prop-types';

export default class ShortInfo extends React.Component {
    render() {
        return(
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={this.props.onPress}>
                        <Image style={{ borderRadius: 30, width: 60, height: 60 }}
                            source={{ uri: this.props.profile_picture }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'flex-start', padding: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.props.username }</Text>
                    <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#ff9797' }}>{this.props.bio}</Text>
                </View>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={this.props.onFollowPress}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {!this.props.isMine ? <View style={{ width: 80, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 2, backgroundColor: (this.props.followed ? '#FF5252' : '#fff'), borderColor: '#FF5252', padding: 5 }}><Text style={{ backgroundColor: 'transparent', color: (this.props.followed ? '#fff' : '#FF5252'), fontSize: 14 }}>{this.props.followed ? 'Following' : 'Follow'}</Text></View> : <View></View>}
                </View>
                </TouchableOpacity>
            </View>
        );
    }
}

ShortInfo.defaultProps = {
    profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
    username: 'Unknown Name',
    bio: 'No bio.',
    isMine: false,
    followed: false
  };

ShortInfo.propTypes = {
    profile_picture: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    isMine: PropTypes.bool,
    followed: PropTypes.bool,
    onFollowPress: PropTypes.func,
    onPress: PropTypes.func,
  };