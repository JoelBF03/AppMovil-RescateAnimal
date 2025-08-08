import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';
import Home from './home';
import Profile from './profile';
import CreateReport from './createReport';
import styles from '../styles/dashboardStyle';
import { UserContext } from '../contexts/userContext';
import AllReports from './allReports';
import MyReports from './myReports';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const { logout } = useContext(UserContext)

    return (
        <DrawerContentScrollView {...props} style={styles.drawerContent}>
            <DrawerItem
                label="Inicio"
                onPress={() => props.navigation.navigate('Home')}
                labelStyle={styles.drawerLabel}
                icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
                style={styles.drawerItem}
            />
            <DrawerItem
                label="Perfil"
                onPress={() => props.navigation.navigate('Profile')}
                labelStyle={styles.drawerLabel}
                icon={({ color, size }) => <Icon name="account-outline" color={color} size={size} />}
                style={styles.drawerItem}
            />
            <DrawerItem
                label="Nuevo Reporte"
                onPress={() => props.navigation.navigate('CreateReport')}
                labelStyle={styles.drawerLabel}
                icon={({ color, size }) => <Icon name="plus-circle-outline" color={color} size={size} />}
                style={styles.drawerItem}
            />

            <DrawerItem
                label="Reportes"
                onPress={() => props.navigation.navigate('AllReports')}
                labelStyle={styles.drawerLabel}
                icon={({ color, size }) => <Icon name="file-document" color={color} size={size} />}
                style={styles.drawerItem}
            />

            <DrawerItem
                label="Mis Reportes"
                onPress={() => props.navigation.navigate('MyReports')}
                labelStyle={styles.drawerLabel}
                icon={({ color, size }) => <Icon name="clipboard-text" color={color} size={size} />}
                style={styles.drawerItem}
            />

            <DrawerItem
                label="Cerrar Sesión"
                onPress={() => {
                    logout();
                    props.navigation.closeDrawer();

                }}
                labelStyle={[styles.drawerLabel, { color: '#e74c3c' }]}
                icon={({ color, size }) => <Icon name="logout" color="#e74c3c" size={size} />}
                style={styles.drawerItem}
                />
        </DrawerContentScrollView>
    );
}

export default function Dashboard() {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
            <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
            <Drawer.Screen name="CreateReport" component={CreateReport} options={{ title: 'Nuevo Reporte' }} />
            <Drawer.Screen name="AllReports" component={AllReports} options={{ title: 'Reportes' }} />
            <Drawer.Screen name="MyReports" component={MyReports} options={{ title: 'Mis Reportes' }} />
        </Drawer.Navigator>
    );
}
