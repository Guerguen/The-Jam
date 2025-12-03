import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import HomeScreen from './screens/Home';
import SingersListScreen from './screens/SingersList';
import SingerScreen from './screens/Singer';
import { getCurrentUser } from './services/storage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedSingerId, setSelectedSingerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const user = await getCurrentUser();
    if (user) {
      setCurrentScreen('home');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27B062" />
      </View>
    );
  }

  if (currentScreen === 'singer' && selectedSingerId) {
    return (
      <SingerScreen 
        singerId={selectedSingerId} 
        onBack={() => setCurrentScreen('singers')} 
      />
    );
  }

  if (currentScreen === 'singers') {
    return (
      <SingersListScreen 
        onSelectSinger={(id) => {
          setSelectedSingerId(id);
          setCurrentScreen('singer');
        }}
        onBack={() => setCurrentScreen('home')} 
      />
    );
  }

  if (currentScreen === 'home') {
    return (
      <HomeScreen 
        onLogout={() => setCurrentScreen('login')} 
        onViewSingers={() => setCurrentScreen('singers')}
      />
    );
  }

  if (currentScreen === 'signup') {
    return (
      <SignUpScreen 
        onBack={() => setCurrentScreen('login')} 
        onSuccess={() => setCurrentScreen('login')} 
      />
    );
  }

  return (
    <LoginScreen 
      onLogin={() => setCurrentScreen('home')} 
      onSignUp={() => setCurrentScreen('signup')} 
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020202',
  },
});
