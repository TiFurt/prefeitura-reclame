import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import BasePage from '../components/BasePage';

export default function RegisterPage() {
  const [validation, setValidation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  createAccount = async () => {
    console.log('Create account');
  }

  return (
    <BasePage>
      <Text style={styles.header}>Crie a sua conta</Text>
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

      <TextInput
        style={styles.input}
        onChangeText={setConfPassword}
        value={confPassword}
        placeholder="Confirmação de Senha"
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={createAccount}
        style={styles.submit}
        title="Criar"
        accessibilityLabel="Criar"
      >
        <Text style={styles.submitLabel}>Criar</Text>

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
