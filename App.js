import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import CreateClaimPage from './pages/CreateClaimPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="CreateClaimPage" component={CreateClaimPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
