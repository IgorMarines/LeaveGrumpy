import { useEffect, useState } from "react";
import { Card } from "../../shared/components/Card/Card.jsx";
import { ViewContainer } from "../../shared/components/Container/styles.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Home = ({navigation}) => {


  const [todayPhrase, setTodayPhrase] = useState('')

  const getPhrase = async () => {
    try {
      const lastUpdated = await AsyncStorage.getItem('lastUpdated');
      const currentDate = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato 'YYYY-MM-DD'
  
      // Verifica se já passou um dia desde a última atualização
      if (lastUpdated !== currentDate) {
        const url = 'https://leave-grumpy-default-rtdb.firebaseio.com/frases.json';
        const response = await fetch(url);
        const data = await response.json();
        const lengthPhrases = Object.keys(data).length;
        const randomIndex = Math.floor(Math.random() * lengthPhrases);
  
        const setPhraseTodayStorage = await AsyncStorage.setItem('phraseToday', data[randomIndex].frase);
        await AsyncStorage.setItem('lastUpdated', currentDate); // Atualiza a data da última atualização
  
        const getPhraseToday = await AsyncStorage.getItem('phraseToday');
        console.log(getPhraseToday);
      } else {
        console.log('A frase já foi atualizada hoje');
        const getPhraseToday = await AsyncStorage.getItem('phraseToday');
        setTodayPhrase(getPhraseToday);
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  

  useEffect(() => {
    getPhrase();
  }, []);


  const insertData = async () => {

    const getPhraseToday = await AsyncStorage.getItem('phraseToday');

    try {
      const uid = await AsyncStorage.getItem('userUid');
      const url = `https://leave-grumpy-default-rtdb.firebaseio.com/favoritos/${uid}.json`;

      // Insere a nova frase diretamente
      const data = {
        frase: getPhraseToday,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data inserted successfully');
        // Atualiza as frases após a inserção
        getPhrase();
      } else {
        console.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ViewContainer centered>
  
        <Card title="Frase do dia:" frase={todayPhrase} saveItem={insertData} saveScreen/>
      

    </ViewContainer>
  );
};
