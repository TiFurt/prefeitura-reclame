import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BasePage({ children }) {
  return (
    <SafeAreaView>
      <View style={style.container}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
  }
});
