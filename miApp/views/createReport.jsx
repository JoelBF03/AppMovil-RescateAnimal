import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  RadioButton,
  Surface,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { crearReporte } from '../api/axiosClient';
import styles from '../styles/createReportStyle';
import { useFocusEffect } from '@react-navigation/native';

export default function CreateReport({ navigation }) {
  const [petName, setPetName] = useState('');
  const [status, setStatus] = useState('Perdida');
  const [ubication, setUbication] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setPetName('');
      setStatus('Perdida');
      setUbication('');
      setDescription('');
      setImageBase64(null);
    }, [])
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.3,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageBase64(result.assets[0].base64);
    }
  };

  const handleSubmit = async () => {
    if (!ubication || !imageBase64) {
      Alert.alert('Error', 'Ubicación e imagen son obligatorias');
      return;
    }

    try {
      const data = {
        petName,
        status,
        ubication,
        description,
        image: imageBase64,
      };

      await crearReporte(data);
      Alert.alert('Éxito', 'Reporte creado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo crear el reporte');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/wallpaper.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Surface style={styles.surface}>
            <Text style={styles.title}>Nuevo Reporte</Text>

            <TextInput
              label="Nombre de la mascota (opcional)"
              value={petName}
              onChangeText={setPetName}
              style={styles.input}
              mode="outlined"
            />

            <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>Estado</Text>
            <RadioButton.Group onValueChange={setStatus} value={status}>
              <View style={styles.radioGroup}>
                <RadioButton.Item label="Perdida" value="Perdida" />
              </View>
            </RadioButton.Group>

            <TextInput
              label="Ubicación"
              value={ubication}
              onChangeText={setUbication}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Descripción (opcional)"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              multiline
              numberOfLines={4}
              mode="outlined"
            />

            <Button
              mode="outlined"
              onPress={pickImage}
              style={styles.button}
            >
              Seleccionar Imagen
            </Button>

            {imageBase64 && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                style={styles.image}
              />
            )}

            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Crear Reporte
            </Button>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
