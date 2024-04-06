import { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import BasePage from "../components/BasePage";
import CardComponent from "../components/CardComponent";
import { routes } from "../routes";

export default function HomePage({ route, navigation }) {
  const _getCards = (claims) => {
    return claims.map((claim) => <CardComponent key={claim.id} claim={claim} />);
  };

  const [claims, setClaims] = useState(_getCards(route.params.claims));

  const actions = [
    {
      text: "Create Claim",
      icon: require("../assets/icons/plus-solid.png"),
      name: "bt_add_claim",
      position: 1,
      textColor: "#1253bc",
    },
  ];

  const _redirectToCreateClaimPage = () => {
    navigation.navigate(routes.CreateClaim);
  };

  useEffect(() => {
    setClaims(_getCards(route.params.claims));
  }, [route.params.claims]);

  return (
    <BasePage>
      <ScrollView contentContainerStyle={styles.scrollView}>{claims}</ScrollView>

      <FloatingAction overrideWithAction actions={actions} onPressItem={_redirectToCreateClaimPage} />
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
