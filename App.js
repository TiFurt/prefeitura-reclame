import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from 'react';
import CreateClaimPage from "./pages/CreateClaimPage";
import HomePage from "./pages/HomePage";
import ViewPage from "./pages/ViewPage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import { routes } from "./routes";
import CameraPage from "./pages/CameraPage";
import { initDb } from "./services/LocalDatabase";
import { listenConnection } from "./services/NetworkInfo";
import AuthService from "./services/AuthService";
import { navigationRef, popToTop, replace } from './RootNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState('');

  useEffect(() => {
    initDb();
    listenConnection();

    AuthService.getInstance().onAuthStateChanged((user) => {
      if (!!user?.uid) {
        setInitialRouteName(routes.Home);
      }
      else {
        setInitialRouteName(routes.Welcome);
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
