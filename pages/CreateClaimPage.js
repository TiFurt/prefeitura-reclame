import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { requestPermissionsAsync, saveToLibraryAsync, PermissionStatus } from 'expo-media-library';
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import BasePage from "../components/BasePage";
import FloatingActionComponent from "../components/FloatingActionComponent";
import { routes } from "../routes";
import ClaimService from "../services/ClaimService";
import AuthService from "../services/AuthService";


export default function CreateClaimPage({ route, navigation }) {
  const { claim } = route?.params || {};

  const [name, onChangeName] = useState(claim?.name || "");
  const [description, onChangeDescription] = useState(claim?.description || "");
  const [selectedTags, setSelectedTags] = useState(claim?.tags?.map((tag) => tag.id) || []);
  const [photo, setPhoto] = useState(claim?.image || null);
  const [location, setLocation] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [tags, setTags] = useState([]);
  const [canUserSave, setCanUserSave] = useState(AuthService.getInstance().isAuthenticated());
  const [canUserUpdate, setCanUpdate] = useState(
    AuthService.getInstance().isAuthenticated() &&
    claim?.userId === AuthService.getInstance().getCurrentUser()?.uid
  );

  const fetchTags = async () => {
    try {
      const tags = await ClaimService.getInstance().getTags();
      setTags(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const updateCanUserSave = () => {
    if (!claim?.id || !claim?.userId) {
      return;
    }

    AuthService.getInstance().onAuthStateChanged((user) => {
      setCanUserSave(!!user);
      setCanUpdate(user?.uid === claim.userId);
    });
  };


  useEffect(() => {
    (async () => {
      const mediaLibraryPermission = await requestPermissionsAsync();

      setHasMediaLibraryPermission(mediaLibraryPermission.status === PermissionStatus.GRANTED);
    })();

    fetchTags();
    updateCanUserSave();
  }, []);

  const _savePhotoOnGallery = () => {
    if (claim?.image?.id === photo?.id || !photo?.uri) {
      return;
    }

    saveToLibraryAsync(photo.uri)
  };

  const _saveClaim = async () => {
    if (!canUserSave) {
      return;
    }

    _savePhotoOnGallery();

    if (claim?.id) {
      if (!canUserUpdate) {
        return;
      }

      await ClaimService.getInstance().updateClaim({
        id: claim.id,
        name,
        description,
        tags: selectedTags,
        image: photo,
        location,
      });
    } else {
      await ClaimService.getInstance().createClaim({
        name,
        description,
        tags: selectedTags,
        image: photo,
        location,
      });
    }

    navigation.navigate(routes.Home);
  };

  const _setPhoto = (photo) => {
    setPhoto(photo);
  }

  const _setLocation = () => {
    setLocation(location);
  }

  const _openCamera = () => {
    navigation.navigate(routes.Camera, {
      setPhoto: _setPhoto,
      setLocation: _setLocation,
    });
  }

  let cameraView = null;
  if (photo) {
    cameraView = (
      <Image style={styles.img} source={{ uri: `data:image/png;base64,${photo.base64}` }} />
    );
  }

  if (!hasMediaLibraryPermission) {
    return (
      <BasePage>
        <Text>Libere o uso da galeria</Text>
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
              valueField="id"
              placeholder="Categorias"
              searchPlaceholder="Buscar..."
              value={selectedTags}
              onChange={(items) => {
                setSelectedTags(items);
              }}
              renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="tags" size={20} />}
              selectedStyle={styles.selectedStyle}
            />

            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={_openCamera}
                style={styles.takePhotoButton}
                title={photo ? "Tirar outra foto" : "Tirar foto"}
                accessibilityLabel="Tirar foto"
              >
                <Text style={{ color: "white" }}>{photo ? "Tirar outra foto" : "Tirar foto"}</Text>
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
    height: 700,
    borderRadius: 5,
  },
});
