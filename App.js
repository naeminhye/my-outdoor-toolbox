import { StackNavigator } from 'react-navigation';
import StartScreen from './screens/StartScreen';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import TabScreen from './screens/TabScreen';

const App = StackNavigator({
  Start: { screen: StartScreen },
  SignUp: { screen: SignUp },
  LogIn: { screen: LogIn },
  Tab: { screen: TabScreen },
}, {
  initialRouteName: 'Tab'
}
);

export default App;