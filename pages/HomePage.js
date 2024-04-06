import { StyleSheet, ScrollView, styled } from "react-native";
import BasePage from "../components/BasePage";
import CardComponent from "../components/CardComponent";
import { FloatingAction } from "react-native-floating-action";
import { routes } from "../routes";

export default function HomePage({ navigation }) {
  const actions = [
    {
      text: "Create Claim",
      icon: require("../assets/icons/plus-solid.png"),
      name: "bt_add_claim",
      position: 1,
    },
  ];

  const _redirectToCreateClaimPage = () => {
    navigation.navigate(routes.CreateClaim);
  };

  return (
    <BasePage>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <CardComponent
          claim={{
            title: "Claim 1",
            tags: [
              { name: "Tag Test 1", color: "lightgreen" },
              { name: "Tag Test 2", color: "lightgreen" },
            ],
          }}
        />
        <CardComponent claim={{ title: "Claim 2" }} />
      </ScrollView>

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
