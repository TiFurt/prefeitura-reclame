import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import BasePage from "../components/BasePage";
import CardComponent from "../components/CardComponent";
import FloatingActionComponent from "../components/FloatingActionComponent";
import { routes } from "../routes";
import ClaimService from '../services/ClaimService';
import { useIsFocused } from '@react-navigation/native';

export default function HomePage({ navigation }) {
  const [claims, setClaims] = useState([]);
  const isFocused = useIsFocused();

  const _getCards = (claims) => {
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
      setClaims(_getCards(claimData));
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchClaims();
    }
  }, [isFocused]);

  return (
    <BasePage>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {claims}
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
});
