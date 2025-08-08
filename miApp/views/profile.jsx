import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Platform, ImageBackground } from 'react-native';
import {
    Text,
    TextInput,
    Button,
    Surface,
    Snackbar,
    useTheme,
} from 'react-native-paper';

import { obtenerPerfil, actualizarPerfil } from '../api/axiosClient';
import { UserContext } from '../contexts/userContext';
import styles from '../styles/profileStyle';

const Profile = () => {
    const { usuario, logout } = useContext(UserContext);
    const theme = useTheme();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [mensajeSnackbar, setMensajeSnackbar] = useState('');

    const cargarPerfil = async () => {
        try {
            const data = await obtenerPerfil();
            setFname(data.persona?.fname || '');
            setLname(data.persona?.lname || '');
            setPhone(data.persona?.phone || '');
            setAddress(data.persona?.address || '');
            setEmail(data.email || '');
        } catch (error) {
            alert(error.message || 'Error al cargar perfil');
        } finally {
            setLoading(false);
        }
    };

    const guardarCambios = async () => {
        try {
            const payload = { fname, lname, phone, address };
            await actualizarPerfil(usuario.id, payload);
            setMensajeSnackbar('Perfil actualizado correctamente.');
            setSnackbarVisible(true);
            setEditando(false);
        } catch (error) {
            alert(error.message || 'Error al actualizar perfil');
        }
    };

    useEffect(() => {
        cargarPerfil();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
    }

    return (
        <ImageBackground
            source={require('../assets/wallpaper.jpg')}
            style={[styles.background,]} // <-- Asegúrate de que tenga flex: 1
            resizeMode="cover"
        >
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <Surface style={styles.surface}>
                        <View style={styles.inner}>
                            <Text style={styles.title}>Perfil de Usuario</Text>

                            {/* Inputs... */}
                            <TextInput
                                label="Nombre"
                                value={fname}
                                onChangeText={setFname}
                                mode="outlined"
                                style={styles.input}
                                editable={editando}
                            />
                            <TextInput
                                label="Apellido"
                                value={lname}
                                onChangeText={setLname}
                                mode="outlined"
                                style={styles.input}
                                editable={editando}
                            />

                            <TextInput
                                label="Correo"
                                value={email}
                                mode="outlined"
                                style={styles.input}
                                editable={false}
                            />

                            <TextInput
                                label="Teléfono"
                                value={phone}
                                onChangeText={setPhone}
                                mode="outlined"
                                style={styles.input}
                                editable={editando}
                                keyboardType="phone-pad"
                            />

                            <TextInput
                                label="Dirección"
                                value={address}
                                onChangeText={setAddress}
                                mode="outlined"
                                style={styles.input}
                                editable={editando}
                            />
                            {!editando ? (
                                <Button
                                    mode="contained-tonal"
                                    onPress={() => setEditando(true)}
                                    style={{ backgroundColor: '#c5db06ff' }}
                                >
                                    Editar perfil
                                </Button>
                            ) : (
                                <Button mode="contained" onPress={guardarCambios} style={styles.button}>
                                    Guardar Cambios
                                </Button>
                            )}

                            {Platform.OS !== 'web' && (
                                <Button
                                    mode="contained"
                                    onPress={logout}
                                    style={styles.logoutButton}
                                    labelStyle={styles.logoutLabel}
                                    icon="logout"
                                >
                                    Cerrar sesión
                                </Button>
                            )}
                        </View>
                    </Surface>
                </ScrollView>

                {/* Snackbar correctamente posicionado */}
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={3000}
                    style={{
                        backgroundColor: '#2ecc71',
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        right: 20,
                        borderRadius: 12,
                        elevation: 4,
                    }}
                >
                    {mensajeSnackbar}
                </Snackbar>
            </View>
        </ImageBackground>
    );

};

export default Profile;
