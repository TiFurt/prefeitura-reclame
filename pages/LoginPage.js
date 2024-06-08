import { authenticateAsync, hasHardwareAsync } from "expo-local-authentication";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import BasePage from "../components/BasePage";
import { routes } from "../routes";
import AuthService from "../services/AuthService";

export default function LoginPage({ navigation }) {
  const [biometry, setBiometry] = useState(false);
  const [validation, setValidation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  authenticateBiometryAsync = async () => {
    const result = await authenticateAsync();
    if (!result.success) {
      setValidation('Falha na autenticação com biometria');
      return;
    }

    AuthService.getInstance().login();
    navigation.popToTop();
    navigation.replace(routes.Home);
  };

  hasBiometryHardware = async () => {
    const valid = await hasHardwareAsync();
    setBiometry(valid);

    if (valid) {
      await authenticateBiometryAsync();
    }
  };

  login = async () => {
    console.log('login');
  }

  useEffect(() => {
    (async () => await hasBiometryHardware())();
  }, []);

  return (
    <BasePage>
      <Text style={styles.header}>Entre com sua conta</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="E-mail"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Senha"
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={login}
        style={styles.submit}
        title="Entrar"
        accessibilityLabel="Entrar"
      >
        <Text style={styles.submitLabel}>Entrar</Text>

        <FontAwesome5 name="sign-in-alt" size={20} color="white" />
      </TouchableOpacity>

      {!biometry && <Text>Seu dispositivo não tem suporte para biometria.</Text>}
      {validation && <Text style={styles.errorMessage}> {validation} </Text>}
    </BasePage>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    backgroundColor: "#ffe3e3",
    borderRadius: 6,
    padding: 6,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  submit: {
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
  submitLabel: {
    color: "white",
    fontWeight: "bold",
  },
});
