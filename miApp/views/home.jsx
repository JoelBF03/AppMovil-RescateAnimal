import { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../contexts/userContext";
import { ReportContext } from "../contexts/reportContext";
import { View, ScrollView, FlatList } from "react-native";
import { Text, TouchableRipple, Card, ActivityIndicator } from "react-native-paper";
import HeaderWelcome from '../components/HeaderWelcome';
import ActionButtons from '../components/ActionButtons';
import ReportCard from '../components/reportCard';
import styles from '../styles/homeStyle'; 
import { obtenerReportes } from "../api/axiosClient";

export default function Home({ navigation }) {
    const { usuario } = useContext(UserContext);
    const { setReporteSeleccionado } = useContext(ReportContext);
    const [reportes, setReportes] = useState([]);
    const reportesOrdenados = [...reportes].sort((a, b) => b.id - a.id);
    const reportesLimitados = [...reportesOrdenados.slice(0, 3), { id: 'ver-todos', type: 'ver-todos' }];
    const [loading, setLoading] = useState(true);

    const cargar = async () => {
        try {
            const data = await obtenerReportes();
            setReportes(data);
        } catch (error) {
            console.error("Error al cargar reportes:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback( ()=> {
            cargar();
        }, [])
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderWelcome name={usuario?.persona?.fname || "Usuario"} />
            <ActionButtons navigation={navigation} />

            <Text style={styles.subtitle}>Últimos reportes</Text>

            {loading ? (
                <ActivityIndicator style={{ marginVertical: 20 }} />
            ) : (
                <FlatList
                data={reportesLimitados}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                renderItem={({ item }) =>
                    item.type === 'ver-todos' ? (
                    <View style={{ marginRight: 8 }}>
                        <Card
                        style={{
                            width: 350,
                            height: 350,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#dfe6e9',
                            borderRadius: 12,
                            padding: 16,
                        }}
                        onPress={() => navigation.navigate('AllReports')}
                        >
                        <Card.Content>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: '#2d3436',
                            }}>
                                Ver todos los reportes →
                            </Text>
                        </Card.Content>
                        </Card>
                    </View>
                    ) : (
                    <View style={{ marginRight: 8 }}>
                        <ReportCard data={item} />
                    </View>
                    )
                }
                />
            )}
        </ScrollView>
    );
}
