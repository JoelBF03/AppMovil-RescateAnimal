import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/headerWelcomeStyle';

export default function HeaderWelcome({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>¡Hola,</Text>
      <Text style={styles.name}>{name}!</Text>
      <Text style={styles.subtitle}>¿Perdiste o encontraste una mascota?</Text>
    </View>
  );
}
