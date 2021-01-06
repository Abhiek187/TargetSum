import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Game() {
  const target = Math.floor(Math.random() * 40) + 10;

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingTop: 30
  },
  target: {
    fontSize: 40,
    backgroundColor: "#aaa",
    marginHorizontal: 50,
    textAlign: "center"
  }
});
