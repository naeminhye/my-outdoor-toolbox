import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import NotiScreen from './NotiScreen';
import MessageScreen from './MessageScreen';
import SearchScreen from './SearchScreen';
import PostDetail from './PostDetail';
import SettingScreen from './SettingScreen';
import AddNewPost from './AddNewPost';
import WeatherScreen from './WeatherScreen';
import ScheduleScreen from './ScheduleScreen';

const TabInStack = TabNavigator({
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
    },
});

const TabScreen = StackNavigator({
  TabInStack: { screen: TabInStack },
  PostDetail: { screen: PostDetail },
  Setting: { screen: SettingScreen },
  //AddPost: { screen: AddNewPost },
  Weather: { screen: WeatherScreen },
  Schedule: { screen: ScheduleScreen },
});
export default TabScreen;