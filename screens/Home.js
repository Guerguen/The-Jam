import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { getCurrentUser, logout } from '../services/storage';

export default function HomeScreen({ onLogout, onViewSingers }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logout();
            onLogout();
          }
        }
      ]
    );
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo ao The Jam!</Text>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userInfo}>Login: {user.login}</Text>
      
      {/* Botão para ver cantores */}
      <TouchableOpacity style={styles.singersButton} onPress={onViewSingers}>
        <Text style={styles.singersButtonText}>Ver Cantores</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020202',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    color: '#27B062',
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 40,
  },
  singersButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#27B062',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  singersButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  logoutButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A5568',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
});





