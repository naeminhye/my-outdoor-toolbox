import { TabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import NotiScreen from './NotiScreen';
import MessageScreen from './MessageScreen';
import SearchScreen from './SearchScreen';

const TabScreen = TabNavigator({
    Home: { screen: HomeScreen },
    Message: { screen: MessageScreen },
    Explore: { screen: ExploreScreen },
    Noti: { screen: NotiScreen }, 
    Search: { screen: SearchScreen },
  }, {
    tabBarOptions: { 
      activeTintColor: '#FF5252',
      labelStyle: {
        fontSize: 12,
      }
    }
});

export default TabScreen;