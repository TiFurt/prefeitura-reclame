import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { routes } from "../routes";
import BasePage from '../components/BasePage';
import AuthService from "../services/AuthService";

export default function RegisterPage({ navigation }) {
  const [validation, setValidation] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  createAccount = async () => {
    if (!validate()) {
      return;
    }

    AuthService.getInstance().register({
      name,
      lastName,
      cpf,
      phone,
      address: {
        street,
        number,
        neighborhood,
        city,
        state,
        zipCode,
      },
      email,
      password,
    })
      .then((userCredential) => {
        if (userCredential) {
          redirectToHome();
        }
      })
      .catch(({ code }) => {
        if (code === 'auth/email-already-in-use') {
          setValidation('E-mail já cadastrado');
          return;
        }

        if (code === 'auth/weak-password') {
          setValidation('Senha fraca');
          return;
        }

        setValidation('Erro ao criar conta');
      });
  }

  validate = () => {
    if (!name) {
      setValidation('Nome é obrigatório');
      return false;
    }

    if (!lastName) {
      setValidation('Sobrenome é obrigatório');
      return false;
    }

    if (!cpf) {
      setValidation('CPF é obrigatório');
      return false;
    }

    if (!phone) {
      setValidation('Telefone é obrigatório');
      return false;
    }

    if (!street) {
      setValidation('Rua é obrigatória');
      return false;
    }

    if (!number) {
      setValidation('Número é obrigatório');
      return false;
    }

    if (!neighborhood) {
      setValidation('Bairro é obrigatório');
      return false;
    }

    if (!city) {
      setValidation('Cidade é obrigatória');
      return false;
    }

    if (!state) {
      setValidation('Estado é obrigatório');
      return false;
    }

    if (!zipCode) {
      setValidation('CEP é obrigatório');
      return false;
    }

    if (!email) {
      setValidation('E-mail é obrigatório');
      return false;
    }

    if (!password) {
      setValidation('Senha é obrigatória');
      return false;
    }

    if (password !== confPassword) {
      setValidation('Senhas não conferem');
      return false;
    }

    return true;
  }


  redirectToHome = () => {
    AuthService.getInstance().login();
    navigation.popToTop();
    navigation.replace(routes.Home);
  }

  return (
    <BasePage>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Crie a sua conta</Text>

        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Nome"
        />

        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Sobrenome"
        />

        <TextInput
          style={styles.input}
          onChangeText={setCpf}
          value={cpf}
          placeholder="CPF"
        />

        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          placeholder="Telefone"
        />

        <TextInput
          style={styles.input}
          onChangeText={setStreet}
          value={street}
          placeholder="Rua"
        />

        <TextInput
          style={styles.input}
          onChangeText={setNumber}
          value={number}
          placeholder="Número"
        />

        <TextInput
          style={styles.input}
          onChangeText={setNeighborhood}
          value={neighborhood}
          placeholder="Bairro"
        />

        <TextInput
          style={styles.input}
          onChangeText={setCity}
          value={city}
          placeholder="Cidade"
        />

        <TextInput
          style={styles.input}
          onChangeText={setState}
          value={state}
          placeholder="Estado"
        />

        <TextInput
          style={styles.input}
          onChangeText={setZipCode}
          value={zipCode}
          placeholder="CEP"
        />

        <TextInput
          style={styles.registerInput}
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail"
        />

        <TextInput
          style={styles.registerInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Senha"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.registerInput}
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
      </ScrollView>
    </BasePage>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
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
  scrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
    justifyContent: "center",
  },
  input: {
    width: "48%",
    height: 50,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  registerInput: {
    width: "100%",
    height: 50,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  submit: {
    width: "100%",
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
