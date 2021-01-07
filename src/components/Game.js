import { StatusBar } from "expo-status-bar";
import React, { useState, useMemo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, Text, View } from "react-native";
import RandomNumber from "./RandomNumber";
import shuffle from "lodash.shuffle";

export default function Game({ onPlayAgain, randomNumberCount, initialSeconds }) {
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
  // Shuffle the random numbers to keep the game interesting
  const shuffledRandomNumbers = useMemo(() =>
    shuffle(randomNumbers)
  , [randomNumbers]);

  // Reference keeps the value up to date even in an interval
  const intervalId = useRef(null);

  useEffect(() => {
    // Start the game timer
    intervalId.current = setInterval(() => {
      setRemainingSeconds(remainingSeconds => {
        if (remainingSeconds - 1 === 0) {
          clearInterval(intervalId.current);
        }

        return remainingSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
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
      acc + shuffledRandomNumbers[curr], 0);

    if (sumSelected > target || remainingSeconds === 0) {
      clearInterval(intervalId.current);
      return "LOST";
    } else if (sumSelected === target) {
      clearInterval(intervalId.current);
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
        {shuffledRandomNumbers.map((randomNumber, index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={isNumberSelected(index) || gameStatus !== "PLAYING"}
            onPress={selectNumber}
          />
        )}
      </View>
      {gameStatus !== "PLAYING" && (
        <Button title="Play Again" onPress={onPlayAgain} />
      )}
      <Text>{remainingSeconds}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

Game.propTypes = {
  onPlayAgain: PropTypes.func.isRequired,
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
