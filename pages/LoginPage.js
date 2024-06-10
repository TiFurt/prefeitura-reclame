import { FontAwesome5 } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import BasePage from "../components/BasePage";
import { routes } from "../routes";
import AuthService from "../services/AuthService";

export default function LoginPage({ navigation }) {
  const [validation, setValidation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  login = async () => {
    if (!email) {
      setValidation('E-mail é obrigatório');
      return;
    }

    if (!password) {
      setValidation('Senha é obrigatória');
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          redirectToHome();
        }
      })
      .catch(({ code }) => {
        setValidation('E-mail ou senha inválidos');

        if (code === 'auth/user-not-found') {
          setValidation('Usuário não encontrado');
          return;
        }

        if (code === 'auth/wrong-password') {
          setValidation('Senha inválida');
          return;
        }

        if (code === 'auth/invalid-email') {
          setValidation('E-mail inválido');
          return;
        }

        if (code === 'auth/too-many-requests') {
          setValidation('Muitas tentativas. Tente novamente mais tarde');
          return;
        }

        if (code === 'auth/user-disabled') {
          setValidation('Usuário desabilitado');
          return;
        }

        if (code === 'auth/network-request-failed') {
          setValidation('Falha na conexão. Verifique sua conexão com a internet');
          return;
        }

        setValidation('Erro desconhecido. Tente novamente mais tarde');
      });
  }

  redirectToHome = () => {
    AuthService.getInstance().login();
    navigation.popToTop();
    navigation.replace(routes.Home);
  }

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
