import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/actionButtonsStyle';

export default function ActionButtons({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('CreateReport')}
      >
        <MaterialCommunityIcons name="plus" size={36} color="#fff" />
        <Text style={styles.cardLabel}>Nuevo Reporte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.cardButton, styles.cardOutlined]}
        onPress={() => navigation.navigate('MyReports')}
      >
        <MaterialCommunityIcons name="file-document-outline" size={36} color="#2D9CDB" />
        <Text style={styles.cardLabelOutlined}>Mis Reportes</Text>
      </TouchableOpacity>
    </View>
  );
}
