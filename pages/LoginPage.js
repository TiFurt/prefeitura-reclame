import { authenticateAsync, hasHardwareAsync } from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import BasePage from "../components/BasePage";
import { routes } from "../routes";
import AuthService from "../services/AuthService";
import ClaimService from "../services/ClaimService";

export default function LoginPage({ navigation }) {
  const [biometry, setBiometry] = useState(false);

  authenticateBiometryAsync = async () => {
    const success = await authenticateAsync();
    if (!success) {
      return;
    }

    AuthService.getInstance().login();
    navigation.popToTop();
    navigation.replace(routes.Home, {
      claims: ClaimService.getInstance().claims,
    });
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
    </BasePage>
  );
}
