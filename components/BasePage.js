import { View, StyleSheet } from "react-native";

export default function BasePage({ children }) {
  return (
      <View style={style.container}>
        {children}
      </View>
  )
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
  }
});
