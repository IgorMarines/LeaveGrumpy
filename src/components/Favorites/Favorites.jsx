import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViewContainer } from '../../shared/components/Container/styles';
import { Card } from '../../shared/components/Card/Card';

export const Favorites = ({ navigation }) => {
  const [phrases, setPhrases] = useState([]);
  const [phraseIds, setPhraseIds] = useState([]);

  const getDataPhrases = async () => {
    try {
      const uid = await AsyncStorage.getItem('userUid');
      const url = `https://leave-grumpy-default-rtdb.firebaseio.com/favoritos/${uid}.json`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson && typeof responseJson === 'object') {
        const sortedData = Object.values(responseJson).sort((a, b) => a.id - b.id);
        setPhrases(sortedData);
        setPhraseIds(Object.keys(responseJson)); // Armazena as IDs dos itens
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (index) => {
    try {
      const uid = await AsyncStorage.getItem('userUid');
      const url = `https://leave-grumpy-default-rtdb.firebaseio.com/favoritos/${uid}/${phraseIds[index]}.json`;
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Item deleted successfully');
        const updatedPhrases = phrases.filter((item, idx) => idx !== index);
        setPhrases(updatedPhrases);
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataPhrases();
  }, []);

  return (
    <ViewContainer centered>
      <ScrollView>
        {phrases.map((phraseGroup, index) => (
          <View style={{marginTop: 15}} key={index}>
            <Card title="Frase do dia:" frase={phraseGroup.frase} deleteScreen deleteItem={() => deleteItem(index)} />
          </View>
        ))}
      </ScrollView>
    </ViewContainer>
  );
};
