import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../login';
import Message from '../navbar/message';
import Chat from '../chat';

const HomeStack = createNativeStackNavigator();

function App() {
    return (

        <HomeStack.Navigator>
             <HomeStack.Screen name="Message" component={Message}/>
             <HomeStack.Screen name="Chat" component={Chat} />
             <HomeStack.Screen name="Login" component={Login} />
        </HomeStack.Navigator>
    );
  }

export default function RouterMessage() {
  return (
     <App/>
  );
}