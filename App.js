import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RouterHome from './screens/router/routerHome';
import RouterShop from './screens/router/routerShop';
import RouterNotifications from './screens/router/notifications';
import RouterMessge from './screens/router/routerMessge';
import RouterProfile from './screens/router/routerProfile';
import RouterAdmin from './screens/router/routerAdmin';
import Notifications_repair_work from './screens/navbar/notifications_repair_work';
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

  const [numberData, setNumberData] = useState(null);
  /*   const dispatch = useDispatch(azasd); */
  const login = useSelector((state) => state.login);
  const notificationsReWork = useSelector((state) => state.notificationsRepairWork);

  if (login != "null" && (notificationsReWork == null)) {
    const result = repairWork.getRepairWorkUser(login.id);
    result.then((values) => {

      setNumberData(values.length)
      this.props.dispatch({
        type: 'ADD_NOTIFICATIONSREPAIRWORK',
        payload: values.length
      })
    }).catch((error) => {
      return error
    });

  }

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
        <Tab.Screen name="Notifications" component={Notifications_repair_work}
          options={{
            tabBarBadge: numberData,
            tabBarIcon: ({ size, color }) => (<Ionicons name="notifications" color={color} size={size} />)
          }} />
        <Tab.Screen name="Profile" component={RouterProfile}
          options={{
            tabBarIcon: ({ size, color }) => (<FontAwesome name="user" color={color} size={size} />)
          }} />


      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default function App() {

  const [data, setData] = useState(null);



  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }

  useEffect(() => {
    Linking.addEventListener("ur", handleDeepLink);
    return () => {
      Linking.removeEventListener("url");
    }

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




