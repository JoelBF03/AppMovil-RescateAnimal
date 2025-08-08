import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerReportes } from '../api/axiosClient';
import ReportCard from '../components/reportCard';

export default function AllReports() {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarReportes = async () => {
    try {
      const data = await obtenerReportes();
      setReportes(data);
    } catch (error) {
      alert('Error al cargar reportes');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarReportes();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <FlatList
      data={reportes}
      numColumns={1}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <View style={{ flex: 1, padding: 8 }}>
          <ReportCard data={item} />
        </View>
      )}
    />
  );
}
