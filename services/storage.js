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


