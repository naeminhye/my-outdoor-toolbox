import { TabNavigator } from 'react-navigation';

import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';

const TabScreen = TabNavigator({
  ScreenOne: { screen: ScreenOne },
  ScreenTwo: { screen: ScreenTwo },
  ScreenThree: { screen: ScreenThree }
}, {
  tabBarOptions: { 
    activeTintColor: '#2D2D2D',
    labelStyle: {
      fontSize: 12,
    }
  }
});

export default TabScreen;