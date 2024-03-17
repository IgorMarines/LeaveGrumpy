import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { ViewLogin, ViewTextsLogin, TextLogin, ViewTexts } from "./Styles";
import { Input } from "../../shared/components/Input/Input";
import { Button } from "../../shared/components/Button/Button";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ViewContainer } from "../../shared/components/Container/styles";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => window.alert("Enviamos um email para você"))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const LoginWithEmailandPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const idToken = await user.getIdToken(); // Pegar o IdToken
        const uidUser = await user.uid;
        await AsyncStorage.setItem("userToken", idToken); // Salvar o IdTokeN
        await AsyncStorage.setItem("userUid", uidUser); // Salvar o IdTokeN

        navigation.navigate("Home", { user, idToken });

        console.log("Usuário Logado");
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erro no login:", errorCode, errorMessage);
      });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken"); //Gera o TokEn

        if (userToken) {
          navigation.navigate("Home"); // Manda para a Home
        }
      } catch (error) {
        console.error("Erro ao recuperar as informações de login:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <ViewContainer centered>
      <ViewTextsLogin>
        <TextLogin primary>Login</TextLogin>
        <Input
          placeholder="Digite seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Digite sua senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextLogin terciary onPress={handleForgotPassword}>
          Esqueceu sua senha?
        </TextLogin>

        <Button primary onPress={LoginWithEmailandPassword}>
          <TextLogin secondary>Login</TextLogin>
        </Button>

        <ViewTexts>
          <TextLogin terciary onPress={() => navigation.navigate("Register")}>
            Não possui uma conta? Clique aqui.
          </TextLogin>
        </ViewTexts>
      </ViewTextsLogin>
    </ViewContainer>
  );
};
