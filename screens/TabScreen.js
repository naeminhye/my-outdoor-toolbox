import { TabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';
import ScreenFour from './ScreenFour';

const TabScreen = TabNavigator({
    Home: { screen: HomeScreen },
    Explore: { screen: ExploreScreen },
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