import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../navbar/notifications';


const HomeStack = createNativeStackNavigator();

function App() {
    return (

        <HomeStack.Navigator>
             <HomeStack.Screen name="Notifications" component={Notifications} />
        </HomeStack.Navigator>
    );
  }

export default function RouterMessage() {
  return (
     <App/>
  );
}