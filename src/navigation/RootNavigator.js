import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
);

export default RootNavigator;
