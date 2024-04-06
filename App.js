import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateClaimPage from "./pages/CreateClaimPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { routes } from "./routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.Welcome}>
        <Stack.Screen name={routes.Welcome} component={WelcomePage} />
        <Stack.Screen name={routes.Login} component={LoginPage} />
        <Stack.Screen name={routes.Register} component={RegisterPage} />
        <Stack.Screen name={routes.Home} component={HomePage} />
        <Stack.Screen name={routes.Map} component={MapPage} />
        <Stack.Screen name={routes.CreateClaim} component={CreateClaimPage} options={{ title: "Criar Reclamação" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
