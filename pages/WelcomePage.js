import { Button, Text } from 'react-native';
import BasePage from '../components/BasePage';
import { routes } from '../routes';

export default function WelcomePage({ navigation }) {

  _goToLogin = () => {
    navigation.navigate(routes.Login);
  }

  _goToRegister = () => {
    navigation.navigate(routes.Register);
  }

  return (
    <BasePage>
      <Text>Welcome Page</Text>
      <Button title='Login' onPress={_goToLogin}></Button>
      <Button title='Go to home' onPress={_goToRegister}></Button>
    </BasePage>
  );
}