import React, { useState, useContext } from 'react';
import { ScrollView, ImageBackground } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Surface,
  useTheme,
  TouchableRipple,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/userContext';
import { loginUsuario } from '../api/axiosClient';
import styles from '../styles/loginStyle';

const Login = ({ navigation }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { setUsuario } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUsuario({ email, password });
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('usuario', JSON.stringify(data.user));
      setUsuario(data.user);
    } catch (error) {
      alert(error.message || 'Credenciales inválidas');
    }
  };

  return (
    <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.surface}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}            
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button} labelStyle={styles.buttonLabel}> Ingresar </Button>
          <TouchableRipple onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              ¿No tienes cuenta? Crear cuenta
            </Text>
          </TouchableRipple>
        </Surface>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;

