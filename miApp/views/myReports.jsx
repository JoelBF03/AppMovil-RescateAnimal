import React, { useCallback, useContext, useState } from "react";

import { View, FlatList } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import { obtenerReportes } from "../api/axiosClient";

import { UserContext } from "../contexts/userContext";
import { ReportContext } from "../contexts/reportContext";

import ReportCard from "../components/reportCard";

import styles from "../styles/myReportsStyle";

export default function MyReports({ navigation }) {
  const { usuario } = useContext(UserContext);
  const { setReporteSeleccionado } = useContext(ReportContext);
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    try {
      const data = await obtenerReportes();
      const soloMios = data.filter(r => r.user_id === usuario.id);
      setReportes(soloMios);
    } catch (error) {
      console.error("Error al cargar tus reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [])
  );

  const handleVerDetalle = (item) => {
    setReporteSeleccionado(item);
    navigation.navigate("ReportDetail");
  };

  return loading ? (
    <ActivityIndicator style={{ marginVertical: 20 }} />
  ) : (
    <FlatList
      data={reportes}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<Text style={styles.title}>Mis Reportes</Text>}
      ListEmptyComponent={
        <Text style={styles.empty}>
          No has publicado ningún reporte aún.
        </Text>
      }
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 50,
        flexGrow: 1,
      }}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <ReportCard data={item} onPress={() => handleVerDetalle(item)} />
        </View>
      )}
    />
  );

}

