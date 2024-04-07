import { AntDesign } from "@expo/vector-icons";
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { SceneMap, TabView } from 'react-native-tab-view';
import FloatingActionComponent from "../components/FloatingActionComponent";
import TagComponent from "../components/TagComponent";
import { routes } from "../routes";

export default function ViewPage({ route, navigation }) {
  const { claim } = route?.params || {};
  const region = {
    latitude: claim?.location?.latitude || 0,
    longitude: claim?.location?.longitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const tags = claim?.tags?.map((tag) => {
    return <TagComponent key={tag.name} tag={tag} />;
  });

  const _redirectToCreateClaimPage = () => {
    navigation.navigate(routes.CreateClaim, { claim });
  };

  const infoTab = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>{claim.name}</Text>
        <View style={styles.tags}>{tags}</View>
        <View style={styles.description}>
          <Text>{claim.description}</Text>
        </View>
        {claim.image
          ? <Image source={{ uri: `data:image/png;base64,${claim.image}` }} style={styles.image} />
          : <View style={styles.noImage}><Text>Imagem não registrada</Text></View>
        }
      </ScrollView>

      <FloatingActionComponent
        onPressItem={_redirectToCreateClaimPage}
        title="Edit Claim" accessibilityLabel="Edit Claim"
      >
        <AntDesign color="white" name="edit" size={20} />
      </FloatingActionComponent>
    </View>
  )

  const getMarker = () => (
    <Marker
      coordinate={region}
      title={claim.name}
      description={claim.description}
    />
  );

  const mapTab = () => (
    <MapView loadingEnabled={true} region={region} style={styles.map}>{getMarker()}</MapView>
  )

  const renderScene = SceneMap({
    info: infoTab,
    map: mapTab,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [tabRoutes] = useState([
    { key: 'info', title: 'Detalhes' },
    { key: 'map', title: 'Mapa' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes: tabRoutes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      swipeEnabled={false}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  container: {
    height: "100%",
    backgroundColor: "#fff",
    padding: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    width: "100%",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 5,
  },
  noImage: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }
});