import { StackNavigator } from 'react-navigation';
import StartScreen from './screens/StartScreen';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import TabScreen from './screens/TabScreen';
import PostDetail from './screens/PostDetail';
import SettingScreen from './screens/SettingScreen';
import AddNewPost from './screens/AddNewPost';
import WeatherScreen from './screens/WeatherScreen';
import ScheduleScreen from './screens/ScheduleScreen';

const App = StackNavigator({
  Start: { screen: StartScreen },
  SignUp: { screen: SignUp },
  LogIn: { screen: LogIn },
  Tab: { screen: TabScreen },
  PostDetail: { screen: PostDetail },
  Setting: { screen: SettingScreen },
  //AddPost: { screen: AddNewPost },
  Weather: { screen: WeatherScreen },
  Schedule: { screen: ScheduleScreen },
}, {
  //initialRouteName: 'Start',
  initialRouteName: 'Tab',
  //mode: 'modal',
}
);

export default App;