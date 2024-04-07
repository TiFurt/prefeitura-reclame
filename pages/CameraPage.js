import { AntDesign } from "@expo/vector-icons";
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraPage({ route, navigation }) {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Libere o uso da câmera</Text>;
  }

  async function take() {
    if (ref) {
      const data = await ref.current.takePictureAsync({ base64: true, quality: 0.5 });
      const { setCaptured, setBase64 } = route.params;

      setCaptured(data.uri)
      setBase64(data.base64)
      navigation.goBack()
      console.log(data)
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