import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RandomNumber({ id, number, isDisabled, onPress }) {
  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isDisabled && styles.disabled]}>{number}</Text>
    </TouchableOpacity>
  );
};

RandomNumber.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  random: {
    backgroundColor: "#999",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center",
  },

  disabled: {
    opacity: 0.3
  }
})
