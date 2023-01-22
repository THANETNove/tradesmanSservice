import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminApp from '../admin_app';
import ShopAdmin from '../shop_admin';
import Announce from '../announce';
import notify_repair_work_Admin from '../notify_repair_work_Admin';
import jobDescriptionAdmin from '../jobDescriptionAdmin';


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
      <HomeStack.Screen name="notify_repair_work_Admin" component={notify_repair_work_Admin}
        options={{
          title: 'งานทั้งหมด',
        }} />
      <HomeStack.Screen name="jobDescriptionAdmin" component={jobDescriptionAdmin}
        options={{
          title: 'รายละเอียดงานทั้งหมด',
        }} />

    </HomeStack.Navigator>
  );
}

export default function RouterProfile() {
  return (
    <App />
  );
}