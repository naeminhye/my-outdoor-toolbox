import { StackNavigator } from 'react-navigation';
import StartScreen from './screens/StartScreen';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import TabScreen from './screens/TabScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const App = StackNavigator({

  Start: { screen: StartScreen },
  Welcome: { screen: WelcomeScreen },
  SignUp: { screen: SignUp },
  LogIn: { screen: LogIn },
  Tab: { screen: TabScreen },
}, {
  initialRouteName: 'Start',
  //initialRouteName: 'Tab',
  //mode: 'modal',
}
);

export default App;