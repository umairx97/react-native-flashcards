import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = props => {
  const { text, onPress, style } = props;
  return (
    <TouchableOpacity
      style={style ? [styles.button, style] : styles.button}
      onPress={() => onPress()}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center"
  },
  button: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "steelblue"
  }
});

export default CustomButton;
