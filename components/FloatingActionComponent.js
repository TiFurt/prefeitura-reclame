import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function FloatingActionComponent({ hide, children, onPressItem, title, accessibilityLabel }) {
  if (hide) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={styles.button}
      title={title}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={styles.iconContainer}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#1253bc",
    borderRadius: 50,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});