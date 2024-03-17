import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

// Estilização da ViewContainer com base no darkTheme
const StyledViewContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.darkTheme === 'true' ? '#4F46E5' : '#000')};
  align-items: ${(props) => (props.centered ? 'center' : '')};
  justify-content: ${(props) => (props.centered ? 'center' : '')};
`;

const ViewContainer = ({ children, centered }) => {
  const [darkTheme, setDarkTheme] = useState('');

  // Função para obter o valor de darkTheme do AsyncStorage
  const fetchDarkTheme = async () => {
    try {
      const themeValue = await AsyncStorage.getItem('darkTheme');
      setDarkTheme(themeValue);
    } catch (error) {
      console.error('Erro ao obter o tema escuro:', error);
    }
  };

  useEffect(() => {
    fetchDarkTheme();
  }, []);

  return (
    <StyledViewContainer darkTheme={darkTheme} centered={centered}>
      {children}
    </StyledViewContainer>
  );
};

export default ViewContainer;
