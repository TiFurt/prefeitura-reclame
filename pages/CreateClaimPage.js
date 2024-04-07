import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import BasePage from "../components/BasePage";
import FloatingActionComponent from "../components/FloatingActionComponent";
import { routes } from "../routes";
import ClaimService from "../services/ClaimService";

export default function CreateClaimPage({ route, navigation }) {
  const { claim } = route?.params || {};

  const [name, onChangeName] = useState(claim?.name || "");
  const [description, onChangeDescription] = useState(claim?.description || "");
  const [selectedTags, setSelectedTags] = useState(claim?.tags || []);
  const [base64, setBase64] = useState(claim?.image || null);
  const [location, setLocation] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setHasLocation(false);
        return;
      }

      setHasLocation(true);
      let location = await getCurrentPositionAsync({});
      const { latitude, longitude, altitude } = location.coords;
      setLocation({ latitude, longitude, altitude });
    })();
  }, []);

  const tags = ClaimService.getInstance().getTags().map((tag) => {
    return { name: tag.name, value: tag };
  });

  const _saveClaim = () => {
    if (!name || !description || !selectedTags.length || !base64 || !location) {
      return;
    }

    if (claim?.id) {
      ClaimService.getInstance().updateClaim({
        id: claim.id,
        name,
        description,
        tags: selectedTags,
        image: base64,
        location,
      });
      navigation.navigate(routes.View, {
        claim: ClaimService.getInstance().getClaimById(claim.id),
      });
      return;
    }

    ClaimService.getInstance().createClaim({
      name,
      description,
      tags: selectedTags,
      image: base64,
      location,
    });
    navigation.navigate(routes.Home, {
      claims: ClaimService.getInstance().claims,
    });
  };

  const _openCamera = () => {
    navigation.navigate(routes.Camera, {
      setBase64,
    });
  }

  let cameraView = null;
  if (base64) {
    cameraView = (
      <Image style={styles.img} source={{ uri: `data:image/png;base64,${base64}` }} />
    );
  }

  if (!hasLocation) {
    return (
      <BasePage>
        <Text>Libere o uso da localização</Text>
      </BasePage>
    );
  }

  return (
    <BasePage>
      <ScrollView contentContainerStyle={styles.scrollView}>
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

            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={_openCamera}
                style={styles.takePhotoButton}
                title={base64 ? "Tirar outra foto" : "Tirar foto"}
                accessibilityLabel="Tirar foto"
              >
                <Text style={{ color: "white" }}>{base64 ? "Tirar outra foto" : "Tirar foto"}</Text>
                <AntDesign style={styles.icon} color="white" name="camera" size={20} />
              </TouchableOpacity>
            </View>

            {cameraView}
          </View>
        </View>
      </ScrollView>

      <FloatingActionComponent
        onPressItem={_saveClaim}
        title="Enviar"
        accessibilityLabel="Enviar reclamação"
      >
        <FontAwesome5 name="telegram-plane" size={20} color="white" />
      </FloatingActionComponent>
    </BasePage>
  );
}

styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  container: {
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
    justifyContent: "center",
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
  imageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoButton: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1253bc",
    borderRadius: 10,
    padding: 10,
  },
  img: {
    width: "100%",
    height: 500,
    borderRadius: 5,
  },
});
