import { Text, View, StyleSheet } from "react-native";

export default function TagComponent({ tag }) {
  return (
    <View style={{ ...styles.card, backgroundColor: tag.color }}>
      <Text style={{ ...styles.title }}>{tag.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "flex-start",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 30,
  },
  title: {
    fontSize: 9,
    fontWeight: "bold",
  },
});
