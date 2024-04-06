import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BasePage({ children }) {
  return (
    <SafeAreaView>
      <View>
        {children}
      </View>
    </SafeAreaView>
  )
}