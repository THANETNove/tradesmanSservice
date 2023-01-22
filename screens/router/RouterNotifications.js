import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Notifications_repair_work from '../notifications_repair_work';

const HomeStack = createNativeStackNavigator();

function App() {
    return (

        <HomeStack.Navigator>
            <HomeStack.Screen name="Notifications" component={Notifications_repair_work} />
        </HomeStack.Navigator>
    );
}

export default function RouterMessage() {
    return (
        <App />
    );
}