import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Notify_repair_work_Technician from '../notify_repair_work_Technician';
import jobDescriptionTechnician from '../jobDescriptionTechnician';

const HomeStack = createNativeStackNavigator();

function App() {
    return (

        <HomeStack.Navigator>
            <HomeStack.Screen name="Notify_repair_work_Technician" component={Notify_repair_work_Technician} options={{
                title: 'งานทั้งหมด',
            }} />
            <HomeStack.Screen name="jobDescriptionTechnician" component={jobDescriptionTechnician}
                options={{
                    title: 'รายละเอียดงาน',
                }} />
        </HomeStack.Navigator>
    );
}

export default function RouterMessage() {
    return (
        <App />
    );
}