import { Button, Text } from 'react-native';
import BasePage from '../components/BasePage';

export default function WelcomePage({ navigation }) {

  _goToHome = () => {
    navigation.navigate('Home');
  }

  return (
    <BasePage>
      <Text>Welcome Page</Text>
      <Button title='Go to home' onPress={_goToHome}></Button>
    </BasePage>
  );
}