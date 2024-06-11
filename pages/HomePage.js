import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { authenticateAsync, hasHardwareAsync } from "expo-local-authentication";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BasePage from "../components/BasePage";
import CardComponent from "../components/CardComponent";
import FloatingActionComponent from "../components/FloatingActionComponent";
import { routes } from "../routes";
import AuthService from '../services/AuthService';
import ClaimService from '../services/ClaimService';

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

  const fetchClaims = () => {
    ClaimService.getInstance().getClaims().then((claimData) => {
      setClaims(claimData);
    }).catch((error) => {
      console.error('Error fetching claims:', error);
    });
  };

  useEffect(() => {
    if (isFocused) {
      fetchClaims();
    }
  }, [isFocused]);

  const _authenticateBiometryAsync = () => {
    authenticateAsync().then((result) => {
      if (result.success) {
        setIsAuthenticated(true);
      } else {
        console.log('Biometric authentication failed');
      }
    }).catch((error) => {
      console.error('Error during biometric authentication:', error);
    });
  };

  const _hasBiometryHardware = () => {
    hasHardwareAsync().then((valid) => {
      setBiometry(valid)

      if (valid) {
        _authenticateBiometryAsync();
      }
    }).catch((error) => {
      console.error('Error checking biometry hardware:', error);
    });
  };

  const _checkAuthAndBiometry = () => {
    if (AuthService.getInstance().recentAuthenticated) {
      setBiometry(true);
      setIsAuthenticated(true);
    } else {
      _hasBiometryHardware();
    }
  };

  useEffect(() => {

    _checkAuthAndBiometry();
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
        <View style={styles.autenticateView}>
          <Text style={styles.title}>Autentique-se para continuar.</Text>

          <TouchableOpacity
            onPress={_authenticateBiometryAsync}
            style={styles.submit}
            title="Entrar"
            accessibilityLabel="Entrar"
          >
            <Text style={styles.submitLabel}>Autenticar com biometria</Text>
            <FontAwesome5 name="fingerprint" size={20} color="white" />
          </TouchableOpacity>
        </View>
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
  autenticateView: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
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
