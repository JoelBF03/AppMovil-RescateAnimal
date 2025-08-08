import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        const cargarUsuario = async () => {
            const token = await AsyncStorage.getItem('token');
            const datos = await AsyncStorage.getItem('usuario');
            if (token && datos) {
                setUsuario(JSON.parse(datos));
            }
            setCargando(false);
        };
        cargarUsuario();
    }, []);
    
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('usuario');
        setUsuario(null);
    };
    
    return (
        <UserContext.Provider value={{ usuario, setUsuario, logout, cargando }}>
            {children}
        </UserContext.Provider>
    );
};
