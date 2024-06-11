import { AntDesign } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { PermissionStatus as LocationPermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function CameraPage({ route, navigation }) {
  const ref = useRef(null);
  const [facing, setFacing] = useState('back');
  const [hasLocation, setHasLocation] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      const locationPermission = await requestForegroundPermissionsAsync();

      setHasLocation(locationPermission.status === LocationPermissionStatus.GRANTED);
    })();
  }, []);

  if (!permission || !hasLocation) {
    return <Text>Libere o uso da câmera e da localização para continuar</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos de permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }

  const _take = async () => {
    if (ref?.current) {
      try {
        const currentLocation = await getCurrentPositionAsync({});
        const picture = await ref.current.takePictureAsync({ base64: true, quality: 0.5 });
        const { setPhoto, setLocation } = route.params;

        const { latitude, longitude } = currentLocation.coords;
        setLocation({ latitude, longitude });
        setPhoto({ id: uuidv4(), ...picture })
        navigation.goBack()
      } catch (error) {
        console.error('Error taking picture:', error);
      }
      return;
    }

    console.error('Camera ref is not available');
  }

  const _toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <CameraView style={styles.camera} facing={facing} ref={ref}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonFlip}
          onPress={_toggleCameraFacing}>
          <AntDesign color="black" name="retweet" size={40} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTake}
          onPress={_take}>
          <AntDesign color="black" name="camera" size={40} />
        </TouchableOpacity>
      </View>
    </CameraView>
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