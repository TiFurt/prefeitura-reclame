import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
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
        <TouchableOpacity
          onPress={_goToLogin}
          style={styles.button}
          title="Login"
          accessibilityLabel="Login"
        >
          <Text style={styles.buttonLabel}>Login</Text>

          <FontAwesome5 name="sign-in-alt" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={_goToRegister}
          style={styles.button}
          title="Criar Conta"
          accessibilityLabel="Criar Conta"
        >
          <Text style={styles.buttonLabel}>Criar Conta</Text>

          <FontAwesome5 name="sign-in-alt" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </BasePage>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1253bc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonLabel: {
    color: "white",
    fontWeight: "bold",
  },
});