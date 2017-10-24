import { TabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import NotiScreen from './NotiScreen';
import ProfileScreen from './ProfileScreen';
import MessageScreen from './MessageScreen';

const TabScreen = TabNavigator({
    Home: { screen: HomeScreen },
    MessageScreen: { screen: MessageScreen },
    Explore: { screen: ExploreScreen },
    NotiScreen: { screen: NotiScreen }, 
    ProfileScreen: { screen: ProfileScreen },
  }, {
    tabBarOptions: { 
      activeTintColor: '#2D2D2D',
      labelStyle: {
        fontSize: 12,
      }
    }
});

export default TabScreen;