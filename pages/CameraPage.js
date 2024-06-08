import { AntDesign } from "@expo/vector-icons";
import { Camera, PermissionStatus as CameraPermissionStatus, CameraType } from 'expo-camera';
import { PermissionStatus as LocationPermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { v4 as uuidv4 } from "uuid";

export default function CameraPage({ route, navigation }) {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const locationPermission = await requestForegroundPermissionsAsync();

      setHasPermission(cameraPermission.status === CameraPermissionStatus.GRANTED);
      setHasLocation(locationPermission.status === LocationPermissionStatus.GRANTED);
    })();
  }, []);

  if (!hasPermission || !hasLocation) {
    return <Text>Libere o uso da câmera e da localização para continuar</Text>;
  }

  async function take() {
    if (ref) {
      const currentLocation = await getCurrentPositionAsync({});
      const picture = await ref.current.takePictureAsync({ base64: true, quality: 0.5 });
      const { setPhoto, setLocation } = route.params;

      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
      setPhoto({ id: uuidv4(), ...picture })
      navigation.goBack()
    }
  }

  return (
    <Camera style={styles.camera} type={type} ref={ref}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonFlip}
          onPress={() => {
            setType(
              type === CameraType.back
                ? CameraType.front
                : CameraType.back
            );
          }}>
          <AntDesign color="black" name="retweet" size={40} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTake}
          onPress={take}>
          <AntDesign color="black" name="camera" size={40} />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: "100%",
    height: "100%"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  buttonFlip: {
    position: "absolute",
    bottom: 70,
    left: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
  buttonTake: {
    position: "absolute",
    bottom: 70,
    right: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
});