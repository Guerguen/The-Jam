import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList,
  Image
} from 'react-native';
import { getSingers } from '../services/storage';

export default function SingersListScreen({ onSelectSinger, onBack }) {
  const [singers, setSingers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSingers();
  }, []);

  const loadSingers = async () => {
    const singersData = await getSingers();
    setSingers(singersData);
    setLoading(false);
  };

  const renderSingerItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.singerCard}
      onPress={() => onSelectSinger(item.id)}
    >
      <Image 
        source={item.images && item.images[0] ? item.images[0] : require('../assets/imagens/logo.png')}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardGenre}>{item.genre}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando cantores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cantores</Text>
      </View>
      
      <FlatList
        data={singers}
        renderItem={renderSingerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020202',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#4A5568',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#27B062',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  loadingText: {
    color: '#E2E8F0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  listContent: {
    padding: 20,
  },
  singerCard: {
    backgroundColor: '#4A5568',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#2D3748',
  },
  cardContent: {
    padding: 15,
  },
  cardName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 5,
  },
  cardGenre: {
    fontSize: 14,
    color: '#27B062',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#A0AEC0',
    lineHeight: 20,
  },
});

