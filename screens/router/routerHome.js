import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../navbar/home';
import Tradesman from '../tradesman';
import Profile from '../navbar/profile';
import profile_tras_user from '../navbar/profile_tras_user';
import workings_tras_user from '../workings_tras_user';
import address from '../address';
import Login from '../login';
import Ahow_bank from '../show_bank';
import chat from '../chat';



const HomeStack = createNativeStackNavigator();

function App() {
    return (

        <HomeStack.Navigator>
             <HomeStack.Screen name="Home" component={Home} />
             <HomeStack.Screen name="Tradesman" component={Tradesman} />
             <HomeStack.Screen name="Profile" component={Profile} />
             <HomeStack.Screen name="Profile_tras_user" component={profile_tras_user} />
             <HomeStack.Screen name="workings_tras_user" component={workings_tras_user} />
             <HomeStack.Screen name="address" component={address} />
             <HomeStack.Screen name="Login" component={Login} />
             <HomeStack.Screen name="Ahow_bank" component={Ahow_bank} />
             <HomeStack.Screen name="chat" component={chat} />
        </HomeStack.Navigator>
    );
  }

export default function RouterHome() {
  return (
     <App/>
  );
}