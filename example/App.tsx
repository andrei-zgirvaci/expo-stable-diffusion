import * as FileSystem from 'expo-file-system';
import * as ExpoStableDiffusion from 'expo-stable-diffusion';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const MODEL_PATH = FileSystem.documentDirectory + 'Model';
const SAVE_PATH = FileSystem.documentDirectory + 'image.jpeg';
const MAX_STEP_COUNT = 25;

export default function App() {
  const [currentStep, setCurrentStep] = React.useState<number | null>(null);
  const [imageIsGenerated, setImageIsGenerated] = React.useState(false);
  const [prompt, setPrompt] = React.useState('A cat looking up at the stars.');

  React.useEffect(() => {
    const subscription = ExpoStableDiffusion.addStepListener(({ step }) => {
      setCurrentStep(step);
    });

    loadModel();

    return () => subscription.remove();
  }, []);

  async function loadModel() {
    console.log(`Loading Model: ${MODEL_PATH}`);

    await ExpoStableDiffusion.loadModel(MODEL_PATH);

    console.log('Model successfully loaded');
  }

  async function unloadModel() {
    console.log('Unloading Model');

    await ExpoStableDiffusion.unloadModel();

    console.log('Model successfully unloaded');
  }

  async function generateImage() {
    console.log('Generating Images');

    Keyboard.dismiss();

    setCurrentStep(0);
    setImageIsGenerated(false);

    await ExpoStableDiffusion.generateImage({
      prompt,
      stepCount: MAX_STEP_COUNT,
      savePath: SAVE_PATH,
    });

    setTimeout(() => {
      setImageIsGenerated(true);
    }, 1000);

    console.log(`Image successfully saved at: ${SAVE_PATH}`);
  }

  const stepPercentage =
    currentStep != null ? (currentStep / (MAX_STEP_COUNT - 1)) * 100 : 0;
  const imageIsGenerating = currentStep != null && stepPercentage < 100;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
          keyboardVerticalOffset={-40}
        >
          <Pressable onPress={Keyboard.dismiss}>
            <Text style={styles.header}>Generated image</Text>

            <View style={styles.generatedImageContainer}>
              <Text style={styles.generatedImageStepCounter}>
                {currentStep == null ? '✨' : `${Math.round(stepPercentage)}%`}
              </Text>

              {imageIsGenerated && (
                <Image
                  style={styles.generatedImage}
                  source={{ uri: SAVE_PATH }}
                />
              )}
            </View>

            <Text style={styles.header}>Prompt</Text>

            <TextInput
              style={styles.promptInput}
              multiline
              numberOfLines={4}
              value={prompt}
              onChangeText={(text) => setPrompt(text)}
            />

            <Pressable
              style={[
                styles.generateImageButton,
                { opacity: imageIsGenerating ? 0.5 : 1 },
              ]}
              onPress={generateImage}
              disabled={imageIsGenerating}
            >
              <Text style={styles.generateImageButtonText}>
                {imageIsGenerating ? 'Generating...' : 'Generate'}
              </Text>
            </Pressable>

            <View style={styles.debugButtons}>
              <Text style={styles.hiddenButtonText} onPress={loadModel}>
                Load Model
              </Text>

              <Text style={styles.hiddenButtonText} onPress={unloadModel}>
                Unload Model
              </Text>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 20,
    marginBottom: 7.5,
  },
  generatedImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  generatedImageStepCounter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  generatedImage: {
    ...StyleSheet.absoluteFillObject,
  },
  promptInput: {
    height: 150,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  generateImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 6,
    backgroundColor: '#0f172a',
  },
  generateImageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  debugButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 15,
  },
  hiddenButtonText: {
    fontSize: 14,
    color: '#0ea5e9',
  },
});
