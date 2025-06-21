/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
