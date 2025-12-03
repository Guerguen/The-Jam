import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@thejam:users';
const CURRENT_USER_KEY = '@thejam:currentUser';

// Salvar usuário no cache
export const saveUser = async (userData) => {
  try {
    const users = await getUsers();
    const userExists = users.find(u => u.login === userData.login);
    
    if (userExists) {
      return { success: false, message: 'Usuário já existe!' };
    }
    
    const newUser = {
      id: Date.now().toString(),
      login: userData.login,
      password: userData.password,
      name: userData.name || userData.login,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, message: 'Erro ao salvar usuário: ' + error.message };
  }
};

// Buscar todos os usuários
export const getUsers = async () => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    return [];
  }
};

// Validar login
export const validateLogin = async (login, password) => {
  try {
    const users = await getUsers();
    const user = users.find(u => u.login === login && u.password === password);
    
    if (user) {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Login ou senha incorretos!' };
  } catch (error) {
    return { success: false, message: 'Erro ao validar login: ' + error.message };
  }
};

// Obter usuário atual (logado)
export const getCurrentUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    return null;
  }
};

// Fazer logout
export const logout = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Erro ao fazer logout' };
  }
};

// Limpar todos os dados (útil para testes)
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([USERS_KEY, CURRENT_USER_KEY]);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ========== DADOS MOCKADOS DE CANTORES ==========
const SINGERS_KEY = '@thejam:singers';

// Dados mockados iniciais
const MOCK_SINGERS = [
  {
    id: '1',
    name: 'John Doe',
    description: 'Cantor e compositor brasileiro conhecido por suas baladas românticas e performances emocionantes. Com mais de 10 anos de carreira, já lançou 5 álbuns e conquistou milhões de fãs ao redor do mundo.',
    images: [
      require('../assets/imagens/logo.png'),
      require('../assets/imagens/logo.png'),
      require('../assets/imagens/logo.png'),
    ],
    genre: 'Pop/Rock',
    albums: 5,
    followers: '2.5M'
  },
  {
    id: '2',
    name: 'Maria Silva',
    description: 'Artista versátil que mistura MPB com elementos de jazz e soul. Sua voz única e presença de palco cativante fazem dela uma das principais revelações da música brasileira contemporânea.',
    images: [
      require('../assets/imagens/logo.png'),
      require('../assets/imagens/logo.png'),
      require('../assets/imagens/logo.png'),
    ],
    genre: 'MPB/Jazz',
    albums: 3,
    followers: '1.8M'
  },
  {
    id: '3',
    name: 'Carlos Santos',
    description: 'Cantor de rock alternativo com influências de indie e folk. Suas letras profundas e melodias cativantes conquistaram uma base de fãs dedicada. Já tocou nos principais festivais do país.',
    images: [
      require('../assets/imagens/logo.png'),
      require('../assets/imagens/logo.png'),
    ],
    genre: 'Rock Alternativo',
    albums: 4,
    followers: '950K'
  }
];

// Inicializar cantores mockados (chamar uma vez)
export const initializeSingers = async () => {
  try {
    const existing = await AsyncStorage.getItem(SINGERS_KEY);
    if (!existing) {
      await AsyncStorage.setItem(SINGERS_KEY, JSON.stringify(MOCK_SINGERS));
    }
  } catch (error) {
    console.error('Erro ao inicializar cantores:', error);
  }
};

// Buscar todos os cantores
export const getSingers = async () => {
  try {
    await initializeSingers(); // Garante que os dados existem
    const singersJson = await AsyncStorage.getItem(SINGERS_KEY);
    return singersJson ? JSON.parse(singersJson) : MOCK_SINGERS;
  } catch (error) {
    return MOCK_SINGERS; // Retorna mock se houver erro
  }
};

// Buscar cantor por ID
export const getSingerById = async (id) => {
  try {
    const singers = await getSingers();
    return singers.find(singer => singer.id === id) || null;
  } catch (error) {
    return null;
  }
};





