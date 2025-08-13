import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Olá, mundo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,               // ocupa a tela toda
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center',      // centraliza horizontalmente
    backgroundColor: '#fff',   // fundo branco
  },
});
