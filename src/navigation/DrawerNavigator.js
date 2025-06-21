import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AlertScreen from '../screens/AlertScreen';
import HistoryStack from './HistoryStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="History" component={HistoryStack} />
      <Drawer.Screen name="Alerts" component={AlertScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
