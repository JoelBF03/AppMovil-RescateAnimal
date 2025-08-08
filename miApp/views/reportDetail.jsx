import React, { useContext, useState } from 'react';
import { Alert, View, Image, ScrollView, Linking, TextInput as RNTextInput } from 'react-native';
import {
  Text,
  Card,
  Button,
  IconButton,
  Dialog,
  Portal,
  Snackbar,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { UserContext } from '../contexts/userContext';
import { ReportContext } from '../contexts/reportContext';

import { eliminarReporte, actualizarReporte } from '../api/axiosClient';
import styles from '../styles/reportDetailStyle';

export default function ReportDetail({ navigation }) {
  const { reporteSeleccionado } = useContext(ReportContext);
  const { usuario } = useContext(UserContext);

  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [mostrarSnackbar, setMostrarSnackbar] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');
  const [cargandoGuardado, setCargandoGuardado] = useState(false);

  const [formData, setFormData] = useState({ ...reporteSeleccionado });

  if (!formData) return <Text>No hay datos del reporte</Text>;

  const esPropietario = usuario?.id === formData.user_id;

  const handleEliminar = async () => setMostrarDialogo(true);

  const confirmarEliminacion = async () => {
    try {
      await eliminarReporte(formData.id);
      setMostrarDialogo(false);
      setMensajeSnackbar('Reporte eliminado correctamente.');
      setMostrarSnackbar(true);
      setTimeout(() => navigation.goBack(), 2000);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo eliminar el reporte.');
      setMostrarDialogo(false);
    }
  };

  const handleGuardarCambios = async () => {
    try {
      setCargandoGuardado(true);
      const { petName, description, ubication, status, image } = formData;
      await actualizarReporte(formData.id, { petName, description, ubication, status, image });
      setModoEdicion(false);
      setMensajeSnackbar('Reporte actualizado con éxito.');
      setMostrarSnackbar(true);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudieron guardar los cambios.');
    } finally {
      setCargandoGuardado(false);
    }
  };

  const cambiarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 0.3,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imagenSeleccionada = result.assets[0];
      setFormData({ ...formData, image: imagenSeleccionada.base64 });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>

          {/* Botones de acción */}
          {esPropietario && (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              {modoEdicion ? (
                <IconButton
                  icon="content-save"
                  size={26}
                  onPress={handleGuardarCambios}
                  disabled={cargandoGuardado}
                />
              ) : (
                <>
                  <IconButton icon="pencil" iconColor='green' size={26} onPress={() => setModoEdicion(true)} />
                  <IconButton icon="delete" iconColor='red' size={26} onPress={handleEliminar} />
                </>
              )}
            </View>
          )}

          {/* Imagen */}
          {modoEdicion ? (
            <View style={{ marginBottom: 16 }}>
              {formData.image ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${formData.image}` }}
                  style={{ width: '100%', height: 250, borderRadius: 12 }}
                />
              ) : (
                <Text>No hay imagen</Text>
              )}
              <Button mode="outlined" onPress={cambiarImagen} style={{ marginTop: 10 }}>
                Cambiar imagen
              </Button>
            </View>
          ) : (
            formData.image && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${formData.image}` }}
                style={{ width: '100%', height: 250, borderRadius: 12, marginBottom: 16 }}
              />
            )
          )}

          {/* Campos del reporte */}
          {modoEdicion ? (
            <>
              <TextInput
                label="Nombre de la mascota"
                value={formData.petName}
                onChangeText={(text) => setFormData({ ...formData, petName: text })}
              />

              <TextInput
                label="Ubicación"
                value={formData.ubication}
                onChangeText={(text) => setFormData({ ...formData, ubication: text })}
              />

              <TextInput
                label="Descripción"
                value={formData.description}
                multiline
                onChangeText={(text) => setFormData({ ...formData, description: text })}
              />

              <Text style={{ marginTop: 16 }}>Estado:</Text>
              <RadioButton.Group
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                value={formData.status}
              >
                <RadioButton.Item label="Perdida" value="Perdida" />
                <RadioButton.Item label="Encontrada" value="Encontrada" />
              </RadioButton.Group>
            </>
          ) : (
            <>
              <Text style={styles.title}>{formData.petName}</Text>
              <Text style={[styles.status, formData.status === 'Perdida' ? styles.lost : styles.found]}>
                {formData.status}
              </Text>
              <Text style={styles.label}>Ubicación:</Text>
              <Text style={styles.text}>{formData.ubication}</Text>

              {formData.description && (
                <>
                  <Text style={styles.label}>Descripción:</Text>
                  <Text style={styles.text}>{formData.description}</Text>
                </>
              )}

              <Text style={styles.label}>Fecha de reporte:</Text>
              <Text style={styles.text}>
                {new Date(formData.created_at).toLocaleString()}
              </Text>
            </>
          )}

          {/* Contacto del reportante */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.label}>📇 Contacto del reportante:</Text>

            <View style={styles.contactRow}>
              <Ionicons name="person-circle-outline" size={22} color="#2d3436" />
              <Text style={styles.text}>{formData.user?.name || 'Anónimo'}</Text>
            </View>

            {formData.user?.email && (
              <View style={styles.contactRow}>
                <Ionicons name="mail-outline" size={22} color="#2d3436" />
                <Text style={styles.text}>{formData.user.email}</Text>
              </View>
            )}

            {formData.user?.persona?.phone && (
              <>
                <View style={styles.contactRow}>
                  <Ionicons name="call-outline" size={22} color="#2d3436" />
                  <Text style={styles.text}>{formData.user.persona.phone}</Text>
                </View>

                <View style={styles.contactActions}>
                  <IconButton
                    icon="phone"
                    size={26}
                    onPress={() => Linking.openURL(`tel:${formData.user.persona.phone}`)}
                  />
                  <IconButton
                    icon="message"
                    size={26}
                    onPress={() => Linking.openURL(`sms:${formData.user.persona.phone}`)}
                  />
                  <IconButton
                    icon="whatsapp"
                    size={26}
                    onPress={() =>
                      Linking.openURL(
                        `https://wa.me/593${formData.user.persona.phone.replace(/^0/, '')}`
                      )
                    }
                  />
                </View>
              </>
            )}
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained-tonal"
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        Volver
      </Button>

      {/* Diálogo para confirmar eliminación */}
      <Portal>
        <Dialog visible={mostrarDialogo} onDismiss={() => setMostrarDialogo(false)}>
          <Dialog.Title>¿Eliminar reporte?</Dialog.Title>
          <Dialog.Content>
            <Text>¿Estás seguro de que deseas eliminar este reporte?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setMostrarDialogo(false)}>Cancelar</Button>
            <Button onPress={confirmarEliminacion}>Eliminar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Snackbar */}
      <Snackbar
        visible={mostrarSnackbar}
        onDismiss={() => setMostrarSnackbar(false)}
        duration={2000}
        style={{ backgroundColor: '#2ecc71' }}
      >
        {mensajeSnackbar}
      </Snackbar>
    </ScrollView>
  );
}
