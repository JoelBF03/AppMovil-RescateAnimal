import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './home';
import Profile from './profile';
import CreateReport from './createReport';
import AllReports from './allReports';
import MyReports from "../views/myReports";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#6200ee',
                tabBarStyle: { height: 60, paddingBottom: 5 },
                tabBarLabelStyle: { fontSize: 12 },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="CreateReport"
                component={CreateReport}
                options={{
                    tabBarLabel: 'Nuevo Reporte',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
                    ),
                }}
            />

             <Tab.Screen
                name="AllReports"
                component={AllReports}
                options={{
                    tabBarLabel: 'Reportes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="file-document" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="MyReports"
                component={MyReports}
                options={{
                    tabBarLabel: 'Mis Reportes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-text" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
