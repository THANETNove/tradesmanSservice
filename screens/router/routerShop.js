import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../login';
import Shop from '../navbar/shop';


const HomeStack = createNativeStackNavigator();

function App() {
    return (

        <HomeStack.Navigator>
             <HomeStack.Screen name="Shop" component={Shop} />
        </HomeStack.Navigator>
    );
  }

export default function RouterShop() {
  return (
     <App/>
  );
}