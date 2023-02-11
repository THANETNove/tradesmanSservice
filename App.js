import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RouterHome from './screens/router/routerHome';
import RouterShop from './screens/router/routerShop';
/* import RouterNotifications from './screens/router/notifications'; */
import RouterMessge from './screens/router/routerMessge';
import RouterNotifications from './screens/router/RouterNotifications';
import RouterNotifications_Technician from './screens/router/RouterNotifications_Technician';
import RouterProfile from './screens/router/routerProfile';
import RouterAdmin from './screens/router/routerAdmin';

import notify_repair_work_Technician from './screens/notify_repair_work_Technician';
import { createStore } from 'redux';
/* import allReducer from './redux/index';aa */
import { Provider } from "react-redux";
import configureStore from './redux/reducers';
import { PersistGate } from 'redux-persist/integration/react';
import * as Linking from 'expo-linking';
import { Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import repairWork from "./screens/service/getService";
/* import { connect } from "react-redux"; */

const { store, persistor } = configureStore();
/* const store = createStore(allReducer); */
const Tab = createBottomTabNavigator();

function MyStack() {

  /*   const dispatch = useDispatch(azasd); */
  const [repairWorkTec, setRepairWorkTec] = useState(null);
  const login = useSelector((state) => state.login);
  const notificationsReWork = useSelector((state) => state.notificationsRepairWork);
  const notificationsRepairWorkTec = useSelector((state) => state.notificationsRepairWorkTec);
  useEffect(() => {
    /*     const result = repairWork.getRepairWorkTechnician();
        result.then((values) => {
          setRepairWorkTec(values.length)
    
        }).catch((error) => {
          console.log(error);
        });
     */
  }, [notificationsRepairWorkTec])

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}

      >
        <Tab.Screen name="Home" component={RouterHome}
          options={{
            tabBarIcon: ({ size, color }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)
          }} />
        {/*   <Tab.Screen name="Shop" component={RouterShop}
        options={{
          tabBarIcon: ({ size, color }) => (<MaterialCommunityIcons name="shopping" color={color} size={size} />)
        }} /> */}
        <Tab.Screen name="message" component={RouterMessge}
          options={{

            tabBarIcon: ({ size, color }) => (<MaterialCommunityIcons name="message-processing" color={color} size={size} />)
          }} />
        {/*   <Tab.Screen name="Notifications" component={RouterNotifications}
        options={{
          tabBarIcon: ({ size, color }) => (<MaterialCommunityIcons name="Notifications" color={color} size={size} />)
        }} /> */}
        {
          (login && login.status_user) === "admin" ?
            <Tab.Screen name="Admin" component={RouterAdmin}

              options={{
                tabBarIcon: ({ size, color }) => (<MaterialIcons name="admin-panel-settings" color={color} size={size} />)

              }} />
            :
            null
        }
        {
          (login && login.status_user) !== "admin" ?
            <Tab.Screen name="Notifications" component={RouterNotifications}
              options={{
                tabBarBadge: notificationsReWork,
                tabBarIcon: ({ size, color }) => (<Ionicons name="notifications" color={color} size={size} />)
              }} />
            : null
        }
        {
          (login && login.status_user) === "ช่าง" ?
            <Tab.Screen name="งานทั้งหมด" component={RouterNotifications_Technician}
              options={{

                tabBarBadge: notificationsRepairWorkTec,
                tabBarIcon: ({ size, color }) => (<MaterialIcons name="notifications-on" color={color} size={size} />)
              }} />

            : null
        }

        <Tab.Screen name="Profile" component={RouterProfile}
          options={{
            tabBarIcon: ({ size, color }) => (<FontAwesome name="user" color={color} size={size} />)
          }} />


      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default function App() {



  useEffect(() => {

    /*  console.log("555"); */
  }, [])




  return (
    <>
      <Provider store={store}>
        <PersistGate load={null} persistor={persistor}>
          <MyStack />
        </PersistGate>
      </Provider>
    </>


  );
}
