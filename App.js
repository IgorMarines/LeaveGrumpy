import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from "firebase/app";
import { Login } from "./src/components/LoginPage/Login.jsx";
import { Register } from './src/components/Register/Register.jsx';
import { Home } from "./src/components/Home/Home.jsx";
import { Favorites } from "./src/components/Favorites/Favorites.jsx";
import SideBar from "./src/components/SideBar/SideBar.jsx";

import { firebaseConfig } from './src/services/firebaseConfig.js';

const Stack = createStackNavigator();

initializeApp(firebaseConfig);
console.log('teste', process.env.EXPO_API_KEY);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

        {/* Define o componente SideBar como cabeçalho em todas as rotas dentro deste grupo */}
        <Stack.Group
          screenOptions={{
            header: (props) => <SideBar {...props} />, // Componente SideBar como cabeçalho
            headerShown: true, // Exibir cabeçalho personalizado
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
