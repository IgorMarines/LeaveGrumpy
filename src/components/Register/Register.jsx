import { View, TextInput, Text } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "../../shared/components/Button/Button";
import { Input } from "../../shared/components/Input/Input";
import { TextRegister, ViewRegister, ViewTexts } from './Styles.jsx'
import { ViewContainer } from "../../shared/components/Container/styles.jsx";

export const Register = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const saveIdTokenToAsyncStorage = async (idToken) => {
    try {
      await AsyncStorage.setItem('userToken', idToken);
    } catch (error) {
      console.error('Erro ao salvar idToken no AsyncStorage:', error);
    }
  };

  const getEmailPassword = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        
        const user = userCredential.user;
        const idToken = user.getIdToken();

        saveIdTokenToAsyncStorage(idToken);

        navigation.navigate('Login')
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
      });

    console.log("Usuário Cadastrado");
  };

  return (
    <ViewContainer primary centered>
      <ViewTexts>
        <TextRegister primary >Cadastre-se</TextRegister>
        <Input
          placeholder="Digite seu Email"
          onChangeText={(text) => setEmail(text)}
        ></Input>

        <Input
          placeholder="Digite sua senha"
          onChangeText={(text) => setPassword(text)}
        ></Input>

          <TextRegister terciary onPress={()=> navigation.navigate('Login') }>Já possui uma conta? Clique aqui.</TextRegister>

        <Button primary onPress={getEmailPassword}>
          <TextRegister secondary>Cadastrar</TextRegister>
        </Button>
      </ViewTexts>
    </ViewContainer>
  );
};

