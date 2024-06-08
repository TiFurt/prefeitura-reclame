import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateClaimPage from "./pages/CreateClaimPage";
import HomePage from "./pages/HomePage";
import ViewPage from "./pages/ViewPage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import { routes } from "./routes";
import CameraPage from "./pages/CameraPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.Welcome}>
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
