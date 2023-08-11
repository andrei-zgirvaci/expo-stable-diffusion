import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import * as FileSystem from "expo-file-system";
import * as ExpoStableDiffusion from "expo-stable-diffusion";

const MODEL_PATH = FileSystem.documentDirectory + "Model/stable-diffusion-2-1";
const SAVE_PATH = FileSystem.documentDirectory + "image.jpeg";
const STEP_COUNT = 25;

export default function App() {
  const [currentStep, setCurrentStep] = React.useState(0);
  React.useEffect(() => {
    (async () => {
      Alert.alert(`Loading Model: ${MODEL_PATH}`);

      await ExpoStableDiffusion.loadModel(MODEL_PATH);

      Alert.alert("Model Loaded, Generating Images!");

      setCurrentStep(0);
      await ExpoStableDiffusion.generateImage({
        prompt: "a cat coding at night",
        stepCount: STEP_COUNT,
        savePath: SAVE_PATH,
      });

      Alert.alert(`Image Generated: ${SAVE_PATH}`);
    })();

    const timer = setInterval(() => {
      setCurrentStep(ExpoStableDiffusion.getCurrentStep());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Testing Expo Stable Diffusion</Text>
      <Text>
        Progress: {currentStep}/{STEP_COUNT}
      </Text>
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
