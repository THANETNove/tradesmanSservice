import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../login';
import Registration from '../registration';
import Profile from '../navbar/profile';
import Servict_form from '../service_form';
import Workings from '../workings';
import Bank_account from '../bank_account';
import FromBank from '../fromBank';
import Chat from '../chat';
import Information from '../information';
import Home_paste from '../home_page';
import Address_user from '../address_user';
import Payment from '../payment';
import Privacypolicy from '../privacypolicy';
import ResetPassword from '../reset_password';


const HomeStack = createNativeStackNavigator();

function App() {
  return (

    <HomeStack.Navigator>
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Registration" component={Registration} />
      <HomeStack.Screen name="Servict_form" component={Servict_form} 
      options={{
        title: 'Address',
      }} />
      <HomeStack.Screen name="Workings" component={Workings} />
      <HomeStack.Screen name="Bank_account" component={Bank_account} options={{
        title: 'Bank Account',
      }}  />
      <HomeStack.Screen name="FromBank" component={FromBank} 
       options={{
        title: 'From Bank Account',
      }} />
      <HomeStack.Screen name="Chat" component={Chat} />
      <HomeStack.Screen name="Information" component={Information} 
      options={{
        title: 'Account',
      }} />
      <HomeStack.Screen name="Home_paste" component={Home_paste} />
      <HomeStack.Screen name="Address_user" component={Address_user} options={{
        title: 'Address',
      }} />
      <HomeStack.Screen name="Payment" component={Payment} />
      <HomeStack.Screen name="Privacypolicy" component={Privacypolicy} 
      options={{
        title: 'Privacy Policy',
      }} />
      <HomeStack.Screen name="ResetPassword" component={ResetPassword} 
      options={{
        title: 'ResetPassword',
      }} />

    </HomeStack.Navigator>
  );
}

export default function RouterProfile() {
  return (
    <App />
  );
}