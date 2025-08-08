import React, { useState } from 'react';
import { ScrollView, ImageBackground } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  useTheme,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import styles from '../styles/registerStyle';
import { registrarUsuario } from '../api/axiosClient';

const Register = ({ navigation }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await registrarUsuario({ fname, lname, phone, address, email, password });
      alert('Usuario registrado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      if (error.errors) {
        const mensajes = Object.values(error.errors).flat().join('\n');
        alert(`Errores de validación:\n${mensajes}`);
      } else {
        alert(error.message || 'Error al registrar');
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.surface}>
          <Text style={styles.title}>Crear Cuenta</Text>

          <TextInput
            label="Nombre"
            value={fname}
            onChangeText={setFname}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />
          <TextInput
            label="Apellido"
            value={lname}
            onChangeText={setLname}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-outline" />}
          />
          <TextInput
            label="Teléfono"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
          />
          <TextInput
            label="Dirección"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="map-marker" />}
          />
          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
          />
          <TextInput
            label="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry={!showConfirm}
            left={<TextInput.Icon icon="lock-check" />}
            right={<TextInput.Icon icon={showConfirm ? 'eye-off' : 'eye'} onPress={() => setShowConfirm(!showConfirm)} />}
          />

          <Button mode="contained" onPress={handleRegister} style={styles.button}>
            Registrarse
          </Button>

          <TouchableRipple onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              ¿Ya tienes cuenta? Iniciar sesión
            </Text>
          </TouchableRipple>
        </Surface>
      </ScrollView>
    </ImageBackground>
  );
};

export default Register;
