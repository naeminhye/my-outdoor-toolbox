import React from 'react';
import { StackNavigator } from 'react-navigation';

import StartScreen from './screens/StartScreen';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';

const App = StackNavigator({
  Start: { screen: StartScreen },
  SignUp: { screen: SignUp },
  LogIn: { screen: LogIn },
});

export default App;
