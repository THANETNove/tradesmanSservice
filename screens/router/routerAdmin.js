import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminApp from '../admin_app';
import ShopAdmin from '../shop_admin';
import Announce from '../announce';


const HomeStack = createNativeStackNavigator();

function App() {
  return (

    <HomeStack.Navigator>
      <HomeStack.Screen name="AdminApp" component={AdminApp} 
      options={{
        title: 'Admin',
      }} />
      <HomeStack.Screen name="ShopAdmin" component={ShopAdmin} 
      options={{
        title: 'อนุมัติสินค้า',
      }} />
      <HomeStack.Screen name="Announce" component={Announce} 
      options={{
        title: 'ประกาศ',
      }} />

    </HomeStack.Navigator>
  );
}

export default function RouterProfile() {
  return (
    <App />
  );
}