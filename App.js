import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getNetworkStateAsync } from 'expo-network';
import React, { useEffect, useState } from 'react';
import { navigationRef } from './RootNavigation';
import CameraPage from "./pages/CameraPage";
import CreateClaimPage from "./pages/CreateClaimPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import RegisterPage from "./pages/RegisterPage";
import ViewPage from "./pages/ViewPage";
import WelcomePage from "./pages/WelcomePage";
import { routes } from "./routes";
import AuthService from "./services/AuthService";
import { initDb } from "./services/LocalDatabase";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState('');

  useEffect(() => {
    initDb();

    getNetworkStateAsync().then((state) => {
      if (!state.isConnected) {
        AsyncStorage.getItem('user').then((user) => {
          const parsedUser = JSON.parse(user ?? '{}');
          console.log('parsedUser', parsedUser);

          if (!!parsedUser?.uid) {
            AuthService.getInstance().autenticate();
            setInitialRouteName(routes.Home);
          }
          else {
            AuthService.getInstance().deauthenticate();
            setInitialRouteName(routes.Welcome);
          }
        });
        return;
      }


    });
  }, []);

  if (!initialRouteName) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name={routes.Welcome} component={WelcomePage} options={{ title: "Bem Vindo" }} />
        <Stack.Screen name={routes.Login} component={LoginPage} options={{ title: "Login" }} />
        <Stack.Screen name={routes.Register} component={RegisterPage} options={{ title: "Criar Conta" }} />
        <Stack.Screen name={routes.Home} component={HomePage} options={{ title: "Início", headerBackVisible: false }} />
        <Stack.Screen name={routes.View} component={ViewPage} options={{ title: "Visualizar Relamação" }} />
        <Stack.Screen name={routes.Map} component={MapPage} options={{ title: "Mapa" }} />
        <Stack.Screen name={routes.CreateClaim} component={CreateClaimPage} options={{ title: "Reclamação" }} />
        <Stack.Screen name={routes.Camera} component={CameraPage} options={{ title: "Câmera" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
