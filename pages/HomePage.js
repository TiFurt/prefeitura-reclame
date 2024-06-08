import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import BasePage from "../components/BasePage";
import CardComponent from "../components/CardComponent";
import FloatingActionComponent from "../components/FloatingActionComponent";
import { routes } from "../routes";

export default function HomePage({ route, navigation }) {
  const _getCards = (claims) => {
    return claims.map((claim) => <CardComponent key={claim.id} claim={claim} navigation={navigation} />);
  };

  const [claims, setClaims] = useState(_getCards(route.params.claims));

  const _redirectToCreateClaimPage = () => {
    navigation.navigate(routes.CreateClaim);
  };

  useEffect(() => {
    setClaims(_getCards(route.params.claims));
  }, [route.params.claims]);

  return (
    <BasePage>
      <ScrollView contentContainerStyle={styles.scrollView}>{claims}</ScrollView>

      <FloatingActionComponent
        onPressItem={_redirectToCreateClaimPage}
        title="Criar Reclamação" accessibilityLabel="Criar Reclamação"
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
