import { StyleSheet, TextInput, View, Button } from "react-native";
import BasePage from "../components/BasePage";
import { useState } from "react";
import { MultiSelect } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import ClaimService from "../services/ClaimService";
import { routes } from "../routes";

export default function CreateClaimPage({ navigation }) {
  const claimService = ClaimService.getInstance();

  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = claimService.getTags().map((tag) => {
    return { name: tag.name, value: tag };
  });

  const _saveClaim = () => {
    claimService.createClaim({
      name,
      description,
      tags: selectedTags,
    });
    navigation.navigate(routes.Home, {
      claims: ClaimService.getInstance().claims,
    });
  };

  return (
    <BasePage>
      <View style={styles.container}>
        <View style={styles.fieldsContainer}>
          <TextInput style={styles.input} onChangeText={onChangeName} value={name} placeholder="Nome" />

          <TextInput
            style={styles.input}
            onChangeText={onChangeDescription}
            value={description}
            placeholder="Descrição"
          />

          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={tags}
            labelField="name"
            valueField="value"
            placeholder="Categorias"
            searchPlaceholder="Search..."
            value={selectedTags}
            onChange={(item) => {
              setSelectedTags(item);
            }}
            renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="tags" size={20} />}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        <Button onPress={_saveClaim} title="Enviar" color="#1253bc" accessibilityLabel="Enviar reclamação" />
      </View>
    </BasePage>
  );
}

styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
  },
  input: {
    width: "48%",
    height: 50,
    padding: 10,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  dropdown: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
