import { TabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import NotiScreen from './NotiScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';

const TabScreen = TabNavigator({
    Home: { screen: HomeScreen },
    Search: { screen: SearchScreen },
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