import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminApp from '../admin_app';


const HomeStack = createNativeStackNavigator();

function App() {
  return (

    <HomeStack.Navigator>
      <HomeStack.Screen name="AdminApp" component={AdminApp} 
      options={{
        title: 'Admin',
      }} />

    </HomeStack.Navigator>
  );
}

export default function RouterProfile() {
  return (
    <App />
  );
}