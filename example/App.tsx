import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import * as FileSystem from "expo-file-system";
import * as ExpoStableDiffusion from "expo-stable-diffusion";

const MODEL_PATH = FileSystem.documentDirectory + "Model/stable-diffusion-2-1";
const SAVE_PATH =
  FileSystem.documentDirectory + "GeneratedImages/image.jpeg";

export default function App() {
  React.useEffect(() => {
    (async () => {
      Alert.alert(`Loading Model: ${MODEL_PATH}`);

      await ExpoStableDiffusion.loadModel(MODEL_PATH);

      Alert.alert("Model Loaded, Generating Images!");

      await ExpoStableDiffusion.generateImage({
        prompt: "a photo of an astronaut riding a horse on mars",
        stepCount: 25,
        savePath: SAVE_PATH,
      });

      Alert.alert(`Image Generated: ${SAVE_PATH}`);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Testing Expo Stable Diffusion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
