import { TabNavigator } from 'react-navigation';

import ScreenHome from './ScreenHome';
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';
import ScreenFour from './ScreenFour';

const TabScreen = TabNavigator({
  ScreenHome: { screen: ScreenHome },
  ScreenOne: { screen: ScreenOne },
  ScreenTwo: { screen: ScreenTwo },
  ScreenFour: { screen: ScreenFour }, 
  ScreenThree: { screen: ScreenThree },
}, {
  tabBarOptions: { 
    activeTintColor: '#2D2D2D',
    labelStyle: {
      fontSize: 12,
    }
  }
});

export default TabScreen;