import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function FloatingActionComponent({
  hide,
  danger,
  children,
  onPressItem,
  title,
  accessibilityLabel
}) {
  if (hide) {
    return null;
  }

  _getStyles = () => {
    return danger ? styles.buttonDanger : styles.button;
  }

  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={_getStyles()}
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
  buttonDanger: {
    position: "absolute",
    bottom: 95,
    right: 30,
    backgroundColor: "#ff0000",
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