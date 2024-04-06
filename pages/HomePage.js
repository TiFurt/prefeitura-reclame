import { Text } from 'react-native';
import BasePage from '../components/BasePage';
import { FloatingAction } from "react-native-floating-action";

export default function HomePage({ navigation }) {
  const actions = [
    {
      text: "Create Claim",
      icon: require("../assets/icons/plus-solid.png"),
      name: "bt_add_claim",
      position: 1,
    }
  ];

  const _redirectToCreateClaimPage = () => {
    navigation.navigate("CreateClaimPage");
  };

  return (
    <BasePage>
      <Text>Home Page</Text>

      <FloatingAction
        overrideWithAction
        actions={actions}
        onPressItem={_redirectToCreateClaimPage}
      />
    </BasePage>
  );
}