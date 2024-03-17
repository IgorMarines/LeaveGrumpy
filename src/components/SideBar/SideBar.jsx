import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import house from '../../images/house.png';
import star from '../../images/star.png';

const SideBar = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para controlar o tema escuro

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToFavorites = () => {
    navigation.navigate('Favorites');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userUid');
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const setDarkMode = async () => {
    try {
      const newValue = !isDarkMode; // Inverte o estado atual
      setIsDarkMode(newValue); // Define o novo estado
      await AsyncStorage.setItem('darkTheme', newValue ? 'true' : 'false');
      console.log('Modo escuro configurado:', newValue);
    } catch (error) {
      console.error('Erro ao configurar o modo escuro:', error);
    }
  };

  return (
    <ScrollView
      horizontal // Adiciona scroll horizontal
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
        <Image style={{ width: 15, height: 15, marginRight: 10 }} source={house} alt="Ícone da página de home" />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToFavorites}>
        <Image style={{ width: 15, height: 15, marginRight: 10 }} source={star} alt="Ícone da página de favoritos" />
        <Text style={styles.buttonText}>Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={setDarkMode}>
        <Text style={styles.buttonText}>Dark Theme</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5458FD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white', // Cor da borda
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SideBar;
