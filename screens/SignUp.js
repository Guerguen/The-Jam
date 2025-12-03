import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { saveUser } from '../services/storage';

export default function SignUpScreen({ onBack, onSuccess }) {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name.trim() || !login.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 4 caracteres');
      return;
    }

    setLoading(true);
    const result = await saveUser({
      name: name.trim(),
      login: login.trim(),
      password: password.trim()
    });
    setLoading(false);

    if (result.success) {
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: onSuccess }
      ]);
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/imagens/logo.png')}
      />
      
      <Text style={styles.title}>Criar Conta:</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#A9A9A9"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#A9A9A9"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A9A9A9"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#A9A9A9"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Criando conta...' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#020202',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    tintColor: '#34D399',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A5568',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#E2E8F0',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#27B062',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#A0AEC0',
    fontSize: 16,
  },
});


