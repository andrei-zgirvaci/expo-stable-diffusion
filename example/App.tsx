import { StyleSheet, Text, View } from 'react-native';

import * as ExpoStableDiffusion from 'expo-stable-diffusion';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoStableDiffusion.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
