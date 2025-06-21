import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from '../screens/HistoryScreen';
import VitalsDetailScreen from '../screens/VitalsDetailScreen';

const Stack = createStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryMain"
        component={HistoryScreen}
        options={{ title: 'History', headerShown: false }}
      />
      <Stack.Screen
        name="VitalDetails"
        component={VitalsDetailScreen}
        options={{ title: 'Vital Details', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
