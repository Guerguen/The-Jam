import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Logo da aplicação */}
      <Image
        style={styles.logo}
        source={require('../assets/imagens/logo.png')}
      />
      
      {/* Título da tela */}
      <Text style={styles.title}>Iniciar Sessão:</Text>

      {/* Campo de entrada para o Login */}
      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#A9A9A9"
      />

      {/* Campo de entrada para a Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A9A9A9"
        secureTextEntry={true}
      />

      {/* Botão de Iniciar Sessão */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sessão</Text>
      </TouchableOpacity>

      {/* Texto para a tela de cadastro */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Não possui uma conta? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpLink}>Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020202', // Fundo cinza escuro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 50,
    tintColor: '#34D399', // Cor verde para a logo, se ela for um ícone vetorial ou precisar de tingimento
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E2E8F0', // Texto cinza claro
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A5568', // Fundo dos campos de entrada
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#E2E8F0', // Cor do texto digitado
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#27B062', // Fundo verde do botão
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748', // Cor do texto do botão
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    color: '#A0AEC0', // Texto cinza para "Não possui uma conta?"
  },
  signUpLink: {
    color: '#27B062', // Cor verde para o link de cadastro
    fontWeight: 'bold',
  },
});
