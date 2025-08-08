import React, { useContext } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import styles from '../styles/reportCardStyle';
import { ReportContext } from '../contexts/reportContext';
import { useNavigation } from '@react-navigation/native';
import { obtenerReportePorId } from '../api/axiosClient';


export default function ReportCard({ data, onPress }) {
  const { petName, status, ubication, image, user, description } = data;
  const { setReporteSeleccionado } = useContext(ReportContext);
  const navigation = useNavigation();

const handlePress = async () => {
  try {
    const detalle = await obtenerReportePorId(data.id);
    setReporteSeleccionado(detalle);
    navigation.navigate('ReportDetail');
  } catch (error) {
    console.error('Error al obtener detalle:', error);
  }
};

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} >
      <Card style={styles.card}>
        {image && (
          <Image
            source={{uri: `data:image/jpeg;base64,${image}`}}
            resizeMode="cover"
            style={styles.image}
          />
        )}
        <Card.Content>
          <Text style={styles.title}>{petName || 'Mascota sin nombre'}</Text>
          <Text style={[styles.status, status === 'Perdida' ? styles.lost : styles.found]}>
            {status}
          </Text>
          <Text>Ubicación: {ubication}</Text>
          <Text>Reportado por: {user?.name || 'Anónimo'}</Text>
          {description && <Text>Descripción: {description}</Text>}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
