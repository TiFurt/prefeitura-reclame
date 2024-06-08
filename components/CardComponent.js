import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import TagComponent from "./TagComponent";
import { format } from "date-fns";
import { routes } from "../routes";

export default function CardComponent({ claim, navigation }) {

  const tags = claim?.tags?.map((tag) => {
    return <TagComponent key={tag.id} tag={tag} />;
  });

  const _viewClaim = () => {
    navigation.navigate(routes.View, {
      claim,
    });
  }

  return (
    <TouchableOpacity onPress={_viewClaim}>
      <View style={styles.card}>
        <Text style={styles.title}>{claim.name}</Text>
        <View style={styles.tags}>{tags}</View>
        <Text style={styles.textContent}>
          <Text style={styles.bold}>Ocorrência: </Text>
          {format(new Date(claim.date), "dd/MM/yyy HH:mm:ss")}
        </Text>

        <View style={styles.descriptionContainer}>
          <Text style={{ ...styles.textContent, ...styles.bold }}>Descrição:</Text>
          <Text style={styles.description}>{claim.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "fit-content",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 13,
  },
  description: {
    fontSize: 11,
  },
  descriptionContainer: {
    width: "100%",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
});
