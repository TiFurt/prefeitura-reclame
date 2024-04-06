import { Text } from 'react-native';
import BasePage from '../components/BasePage';
import { FloatingAction } from "react-native-floating-action";

export default function HomePage() {
  const actions = [
    {
      text: "Create Claim",
      icon: require("../assets/icons/plus-solid.png"),
      name: "bt_add_claim",
      position: 1,
    }
  ];

  return (
    <BasePage>
      <Text>Home Page</Text>

      <FloatingAction
        overrideWithAction
        actions={actions}

        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
      />
    </BasePage>
  );
}