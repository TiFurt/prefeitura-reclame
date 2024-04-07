import { Text, View, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import TagComponent from "../components/TagComponent";
import { TabView, SceneMap } from 'react-native-tab-view';
import { useState } from 'react';

export default function ViewPage({ route }) {
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

  const infoTab = () => (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>{claim.name}</Text>
        <View style={styles.tags}>{tags}</View>
        <View style={styles.description}>
          <Text>{claim.description}</Text>
        </View>
      </View>
    </ScrollView>
  )

  const mapTab = () => (
    <MapView loadingEnabled={true} region={region} style={styles.map}></MapView>
  )

  const renderScene = SceneMap({
    info: infoTab,
    map: mapTab,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'info', title: 'Detalhes' },
    { key: 'map', title: 'Mapa' },
  ]);

  console.log(claim);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100vh",
  },
  infoContainer: {
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
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
  }
});