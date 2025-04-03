import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DinoGame = () => {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState("User1");

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem("records");
      if (storedRecords) {
        setRecords(JSON.parse(storedRecords));
      }
    } catch (error) {
      console.error("Error loading records:", error);
    }
  };

  const saveRecord = async (score) => {
    try {
      const newRecord = { user: currentUser, score, date: new Date().toISOString() };
      const updatedRecords = [...records, newRecord].sort((a, b) => b.score - a.score);
      setRecords(updatedRecords);
      await AsyncStorage.setItem("records", JSON.stringify(updatedRecords));
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  const setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let dino = Matter.Bodies.rectangle(50, 300, 50, 50, { label: "Dino" });
    let ground = Matter.Bodies.rectangle(200, 350, 400, 10, { isStatic: true });
    let cactus = Matter.Bodies.rectangle(300, 320, 30, 50, { label: "Cactus" });

    Matter.World.add(world, [dino, ground, cactus]);

    return {
      physics: { engine, world },
      dino: { body: dino, renderer: <View style={styles.dino} /> },
      ground: { body: ground, renderer: <View style={styles.ground} /> },
      cactus: { body: cactus, renderer: <View style={styles.cactus} /> },
    };
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        style={styles.gameContainer}
        systems={[]} // Aquí irían las reglas del juego
        entities={setupWorld()}
        running={running}
      />
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => setRunning(!running)}
      >
        <Text style={styles.startText}>{running ? "Detener" : "Iniciar"}</Text>
      </TouchableOpacity>
      <Text style={styles.recordTitle}>Records:</Text>
      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.recordItem}>{`${item.user}: ${item.score} puntos`}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  gameContainer: { width: 400, height: 400, backgroundColor: "white" },
  dino: { width: 50, height: 50, backgroundColor: "green", position: "absolute" },
  ground: { width: 400, height: 10, backgroundColor: "brown", position: "absolute" },
  cactus: { width: 30, height: 50, backgroundColor: "red", position: "absolute" },
  startButton: { padding: 10, backgroundColor: "blue", marginTop: 20 },
  startText: { color: "white", fontSize: 20 },
  recordTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  recordItem: { fontSize: 16, marginTop: 5 },
});

export default DinoGame;
