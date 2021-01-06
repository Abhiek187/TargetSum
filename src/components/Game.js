import { StatusBar } from "expo-status-bar";
import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import RandomNumber from "./RandomNumber";

export default function Game({ randomNumberCount, initialSeconds }) {
  const [selectedIds, setselectedIds] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  // Generate a random number between min (inclusive) and max (non-inclusive)
  const getRandomNumber = (min, max) => min + Math.floor((max - min) * Math.random());

  // Initialize array of randomNumberCount items (don't change after every re-render)
  const randomNumbers = useMemo(() =>
    Array.from({ length: randomNumberCount }).map(() => getRandomNumber(1, 11))
  , [randomNumberCount]);
  // Set the target to be the sum of four random numbers in the array
  const target = useMemo(() =>
    randomNumbers.slice(0, randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0)
  , [randomNumbers, randomNumberCount]);
  // TODO: Shuffle the random numbers

  useEffect(() => {
    // Start the game timer
    const intervalId = setInterval(() => {
      setRemainingSeconds(remainingSeconds => {
        if (remainingSeconds - 1 === 0) {
          clearInterval(intervalId);
        }

        return remainingSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Check if the number is present in selectedIds array
  const isNumberSelected = numberIndex => selectedIds.indexOf(numberIndex) >= 0;

  const selectNumber = numberIndex => {
    setselectedIds([...selectedIds, numberIndex]);
  };

  // Statuses: PLAYING, WON, LOST (IIFE)
  const gameStatus = (() => {
    const sumSelected = selectedIds.reduce((acc, curr) =>
      acc + randomNumbers[curr], 0);

    if (sumSelected > target || remainingSeconds === 0) {
      return "LOST";
    } else if (sumSelected === target) {
      return "WON";
    } else {
      return "PLAYING";
    }
  })();

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
        {target}
      </Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={isNumberSelected(index) || gameStatus !== "PLAYING"}
            onPress={selectNumber}
          />
        )}
      </View>
      <Text>{remainingSeconds}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired
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

  STATUS_PLAYING: {
    backgroundColor: "#bbb"
  },

  STATUS_WON: {
    backgroundColor: "green"
  },

  STATUS_LOST: {
    backgroundColor: "red"
  }
});
