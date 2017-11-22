import { StackNavigator } from 'react-navigation';
import StartScreen from './screens/StartScreen';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import TabScreen from './screens/TabScreen';
import SettingScreen from './screens/SettingScreen';
import AddNewPost from './screens/AddNewPost';

const App = StackNavigator({
  Start: { screen: StartScreen },
  SignUp: { screen: SignUp },
  LogIn: { screen: LogIn },
  Tab: { screen: TabScreen },
  Setting: { screen: SettingScreen },
  AddPost: { screen: AddNewPost },
}, {
  initialRouteName: 'Tab',
  mode: 'modal',
}
);

export default App;