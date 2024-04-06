import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import TagComponent from "./TagComponent";

export default function CardComponent({ claim }) {
  const [complaining, setComplaining] = useState(claim);

  const tags = complaining?.tags?.map((tag) => {
    return <TagComponent key={tag.name} tag={tag} />;
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{complaining.name}</Text>
      <View style={styles.tags}>{tags}</View>
      <Text style={styles.subtitle}>Data da reclamação: {new Date(complaining.date).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "fit-content",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  subtitle: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  buttonTake: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  contentPhoto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  img: {
    width: "100%",
    height: "80%",
  },
  buttonClose: {
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
