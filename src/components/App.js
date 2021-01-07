import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Game from "./Game";

export default function App() {
  const [gameId, setGameId] = useState(1);

  const resetGame = () => {
    setGameId(gameId + 1);
  };

  return (
    // Changing the key will remount the component
    <Game
      key={gameId}
      onPlayAgain={resetGame}
      randomNumberCount={6}
      initialSeconds={10}
    />
  );
}
