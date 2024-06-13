import { Button, StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.container}>
        <Button title='Login' onPress={_goToLogin}></Button>
        <Button title='Criar Conta' onPress={_goToRegister}></Button>
      </View>
    </BasePage>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
  }
});