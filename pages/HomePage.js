import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { authenticateAsync, hasHardwareAsync } from "expo-local-authentication";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import BasePage from "../components/BasePage";
import CardComponent from "../components/CardComponent";
import FloatingActionComponent from "../components/FloatingActionComponent";
import { routes } from "../routes";
import ClaimService from '../services/ClaimService';
import AuthService from '../services/AuthService';

export default function HomePage({ navigation }) {
  const [claims, setClaims] = useState([]);
  const [biometry, setBiometry] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isFocused = useIsFocused();

  const _listClaims = () => {
    return claims.map((claim) => (
      <CardComponent key={claim.id} claim={claim} navigation={navigation} />
    ));
  };

  const _redirectToCreateClaimPage = () => {
    navigation.navigate(routes.CreateClaim);
  };

  const fetchClaims = async () => {
    try {
      const claimData = await ClaimService.getInstance().getClaims();
      setClaims(claimData);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchClaims();
    }
  }, [isFocused]);

  const _authenticateBiometryAsync = async () => {
    const result = await authenticateAsync();
    if (!result.success) {
      return;
    }

    setIsAuthenticated(true);
  };

  const _hasBiometryHardware = async () => {
    const valid = await hasHardwareAsync();
    setBiometry(valid);

    if (valid) {
      await _authenticateBiometryAsync();
    }
  };

  useEffect(() => {
    if (AuthService.getInstance().recentAuthenticated) {
      setBiometry(true);
      setIsAuthenticated(true);
      return;
    }

    (async () => await _hasBiometryHardware())();
  }, []);

  if (!biometry) {
    return (
      <BasePage>
        <Text>Seu dispositivo não tem suporte para biometria.</Text>
      </BasePage>
    );
  }

  if (!isAuthenticated) {
    return (
      <BasePage>
        <Text>Autentique-se para continuar.</Text>

        <TouchableOpacity
          onPress={(async () => await _authenticateBiometryAsync())}
          style={styles.submit}
          title="Entrar"
          accessibilityLabel="Entrar"
        >
          <Text style={styles.submitLabel}>Autenticar com biometria</Text>

          <FontAwesome5 name="fingerprint" size={20} color="white" />
        </TouchableOpacity>
      </BasePage>
    );
  }

  return (
    <BasePage>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {_listClaims()}
      </ScrollView>
      <FloatingActionComponent
        onPressItem={_redirectToCreateClaimPage}
        title="Criar Reclamação"
        accessibilityLabel="Criar Reclamação"
      >
        <AntDesign color="white" name="plus" size={20} />
      </FloatingActionComponent>
    </BasePage>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
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
