import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Game from "./Game";

export default function App() {
  return (
    <Game randomNumberCount={6} />
  );
}
