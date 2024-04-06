import { Text } from 'react-native';
import BasePage from '../components/BasePage';
import React, { useState, useEffect } from 'react';
import { hasHardwareAsync, authenticateAsync } from 'expo-local-authentication';
import AuthService from '../services/AuthService';
import { routes } from '../routes';

export default function LoginPage({ navigation }) {
  const [biometry, setBiometry] = useState(false);

  authenticateBiometryAsync = async () => {
    const success = await authenticateAsync();
    if (!success) {
      return;
    }

    AuthService.getInstance().login();
    navigation.navigate(routes.Home);
  }

  hasBiometryHardware = async () => {
    const valid = await hasHardwareAsync();
    setBiometry(valid);

    if (valid) {
      await authenticateBiometryAsync();
    }
  }

  useEffect(() => {
    (async () => await hasBiometryHardware())();
  }, []);

  return (
    <BasePage>
      <Text>Login Page</Text>
      <Text>TODO: Adicionar login e senha</Text>
      {!biometry && <Text>Seu dispositivo não tem suporte para biometria.</Text>}
    </BasePage>
  );
}