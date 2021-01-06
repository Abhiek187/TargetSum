import { StatusBar } from 'expo-status-bar';
import React from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from 'react-native';

export default function Game({ randomNumberCount }) {
  // Generate a random number between min (inclusive) and max (non-inclusive)
  const getRandomNumber = (min, max) => min + Math.floor((max - min) * Math.random());

  // Initialize array of randomNumberCount items
  const randomNumbers = Array
    .from({ length: randomNumberCount })
    .map(() => getRandomNumber(1, 11));
  // Set the target to be the sum of four random numbers in the array
  const target = randomNumbers
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  // TODO: Shuffle the random numbers

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) =>
          <Text key={index} style={styles.random}>{randomNumber}</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  },

  target: {
    fontSize: 50,
    backgroundColor: "#bbb",
    margin: 50,
    textAlign: "center"
  },

  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },

  random: {
    backgroundColor: "#999",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center"
  }
});
