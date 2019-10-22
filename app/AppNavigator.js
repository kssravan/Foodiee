import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import RestaurantsNearMe from './screens/RestaurantsNearMe';
import Menu from './screens/Menu';
import Checkout from './screens/Checkout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from './components/IconWithBadge';


const RestaurentsNearMeNavigator = createStackNavigator(
  {
    RestaurantsNearMe,
    menu: Menu,
  },
  {
    initialRouteName: 'RestaurantsNearMe',
  },
);

const checkoutNavigator = createStackNavigator(
  {
    Checkout,
    menu: Menu,
  },
  {
    initialRouteName: 'Checkout',
  },
);

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'home') {
    iconName = `ios-options`;
    // // We want to add badges to home tab icon
    // IconComponent = HomeIconWithBadge;
  } else if (routeName === 'checkout') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    IconComponent = HomeIconWithBadge;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const tabNavigator = createBottomTabNavigator(
  {
    home: RestaurentsNearMeNavigator,
    checkout: checkoutNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);


export default createAppContainer(tabNavigator);
