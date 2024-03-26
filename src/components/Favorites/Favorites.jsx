import React, { useEffect, useState } from 'react';
import { ScrollView, View, Alert, Share, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViewContainer } from '../../shared/components/Container/styles';
import { Card } from '../../shared/components/Card/Card';
import { palette } from '../../shared/colors/palette';

export const Favorites = ({ navigation }) => {
  const [phrases, setPhrases] = useState([]);
  const [phraseIds, setPhraseIds] = useState([]);

  const onShare = async (sharedMessage) => {
    try {
      const result = await Share.share({
        message: sharedMessage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

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
          <View key={index} style={{ marginTop: 15 }}>
            <Card
              color="primary"
              title="Frase do dia:"
              frase={phraseGroup.frase}
              deleteScreen
              deleteItem={() => deleteItem(index)}
              share={() => onShare(phraseGroup.frase)}
            />
            
          </View>
        ))}
      </ScrollView>
    </ViewContainer>
  );
};
