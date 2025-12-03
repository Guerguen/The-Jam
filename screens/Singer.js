import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { getSingerById } from '../services/storage';

const { width } = Dimensions.get('window');

export default function SingerScreen({ singerId, onBack }) {
  const [singer, setSinger] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSinger();
  }, [singerId]);

  const loadSinger = async () => {
    const singerData = await getSingerById(singerId);
    setSinger(singerData);
    setLoading(false);
  };

  if (loading || !singer) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      {/* Nome do Cantor */}
      <Text style={styles.singerName}>{singer.name}</Text>

      {/* Informações do Cantor */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Gênero: {singer.genre}</Text>
        <Text style={styles.infoText}>Álbuns: {singer.albums}</Text>
        <Text style={styles.infoText}>Seguidores: {singer.followers}</Text>
      </View>

      {/* Descrição */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Sobre</Text>
        <Text style={styles.descriptionText}>{singer.description}</Text>
      </View>

      {/* Ilustrações */}
      <View style={styles.imagesContainer}>
        <Text style={styles.imagesTitle}>Ilustrações</Text>
        {singer.images && singer.images.map((imageSource, index) => (
          <Image
            key={index}
            source={imageSource}
            style={styles.singerImage}
            resizeMode="cover"
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020202',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingText: {
    color: '#E2E8F0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  backButton: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#27B062',
    fontSize: 18,
    fontWeight: 'bold',
  },
  singerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#4A5568',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#E2E8F0',
    marginBottom: 8,
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27B062',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: '#A0AEC0',
    lineHeight: 24,
    textAlign: 'justify',
  },
  imagesContainer: {
    marginTop: 10,
  },
  imagesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27B062',
    marginBottom: 20,
  },
  singerImage: {
    width: width - 40,
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#4A5568',
  },
});

