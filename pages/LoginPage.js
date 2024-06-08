import { authenticateAsync, hasHardwareAsync } from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import BasePage from "../components/BasePage";
import { routes } from "../routes";
import AuthService from "../services/AuthService";

export default function LoginPage({ navigation }) {
  const [biometry, setBiometry] = useState(false);
  const [validation, setValidation] = useState('');

  authenticateBiometryAsync = async () => {
    const result = await authenticateAsync();
    if (!result.success) {
      setValidation('Falha na autenticação');
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

  useEffect(() => {
    (async () => await hasBiometryHardware())();
  }, []);

  return (
    <BasePage>
      <Text>Login</Text>
      <Text>TODO: Adicionar login e senha</Text>
      {!biometry && <Text>Seu dispositivo não tem suporte para biometria.</Text>}
      {validation && <Text style={styles.errorMessage}> {validation} </Text>}
    </BasePage>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    backgroundColor: "#ffe3e3",
    borderRadius: 6,
    padding: 6,
    textAlign: "center",
    fontWeight: "bold",
  },
});
