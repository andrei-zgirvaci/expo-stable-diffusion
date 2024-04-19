# expo-stable-diffusion

![GitHub last commit](https://img.shields.io/github/last-commit/andrei-zgirvaci/expo-stable-diffusion)
![npm](https://img.shields.io/npm/v/expo-stable-diffusion)
![GitHub issues](https://img.shields.io/github/issues/andrei-zgirvaci/expo-stable-diffusion)
![GitHub stars](https://img.shields.io/github/stars/andrei-zgirvaci/expo-stable-diffusion)
[![GitHub Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/andrei-zgirvaci)

**_Have you ever wondered if it's possible to generate images using Stable Diffusion natively on your iPhone or iPad while taking advantage of Core ML in an Expo and React Native app?_**

Well, now you can!

![](https://i.imgur.com/1KaxBff.jpg)

> 💡 [Read The Full Detailed Guide](https://andreizgirvaci.com/blog/how-to-create-ai-generated-images-on-ios-in-react-native-using-stable-diffusion)

## Good to Know

> ❗️ `expo-stable-diffusion` currently only works on iOS due to the platform's ability to run Stable Diffusion models on [Apple Neural Engine](https://github.com/hollance/neural-engine)!

> ❗️ This package is not included in the **Expo Go**. You will have to use a [Development Build](https://docs.expo.dev/develop/development-builds/introduction) or build it locally using Xcode!

## Getting Started

Start by installing the `expo-stable-diffusion` module into your Expo managed project:

```bash
npx expo install expo-stable-diffusion
```

## Configuration

### Update iOS Deployment Target

In order for the project to build successfully, you have to set the iOS Deployment Target to `16.2`. You can achieve this by installing the `expo-build-properties` plugin:

```bash
npx expo install expo-build-properties
```

Configure the plugin by adding the following to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "deploymentTarget": "16.2"
          }
        }
      ]
    ]
  }
}
```

### Enable Increased Memory Limit

To prevent memory issues, add the [Increased Memory Limit](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_kernel_increased-memory-limit) capability to your iOS project. Add the following to your `app.json`:

```json
{
  "expo": {
    "ios": {
      "entitlements": {
        "com.apple.developer.kernel.increased-memory-limit": true
      }
    }
  }
}
```

### Build Your iOS App

```bash
npx expo prebuild --clean --platform ios
npx expo run:ios
```

## Usage

After installation and configuration, you can start generating images using `expo-stable-diffusion`. Here's a basic example:

```typescript
import * as FileSystem from 'expo-file-system';
import * as ExpoStableDiffusion from 'expo-stable-diffusion';

const MODEL_PATH = FileSystem.documentDirectory + 'Model/stable-diffusion-2-1';
const SAVE_PATH = FileSystem.documentDirectory + 'image.jpeg';

await ExpoStableDiffusion.loadModel(MODEL_PATH);

const subscription = ExpoStableDiffusion.addStepListener(({ step }) => {
  console.log(`Current Step: ${step}`);
});

await ExpoStableDiffusion.generateImage({
  prompt: 'a cat coding at night',
  stepCount: 25,
  savePath: SAVE_PATH,
});

subscription.remove();
```

> 💡 If you are saving the image in a custom directory, make sure the directory exists. You can create a directory by calling the [`FileSystem.makeDirectoryAsync(fileUri, options)`](https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemmakedirectoryasyncfileuri-options) function from `expo-file-system`.

## Obtaining Stable Diffusion Models

To use the `expo-stable-diffusion` module, you need a converted Core ML Stable Diffusion model. You can convert your own model using [Apple's official guide](https://github.com/apple/ml-stable-diffusion#-converting-models-to-core-ml) or download pre-converted models from [Apple's Hugging Face repository](https://huggingface.co/apple) or [my Hugging Face repository](https://huggingface.co/andrei-zgirvaci/coreml-stable-diffusion-2-1-split-einsum-v2-txt2img).

## Troubleshooting

> ❗️ The model load time and image generation duration take some time, especially on devices with lower RAM than 6GB! Find more information in **Q6** in the **FAQ** section of the [ml-stable-diffusion](https://github.com/apple/ml-stable-diffusion#-faq) repo.

> [Running Stable Diffusion on Lower-End Devices](https://andreizgirvaci.com/blog/how-to-create-ai-generated-images-on-ios-in-react-native-using-stable-diffusion#running-stable-diffusion-on-lower-end-devices)

> [failed to load ANE model](https://github.com/apple/ml-stable-diffusion/issues/51)

## Sponsorship 🩷

**I am looking for at least $1,000 in sponsorship so that I can go full-time into building this project.**

Currently, I dedicate my spare time to the development of this library. Please consider [supporting this project](https://ko-fi.com/andrei_zgirvaci) if you find `expo-stable-diffusion` helpful or if you are using it in a production-ready app. This will motivate me to work on improving it and adding new features like Android support!

In case you need premium guidance on integrating `expo-stable-diffusion` into your own project, bugfixes or any other help, feel free to [contact me](mailto:me@andreizgirvaci.com?subject=Integrating%20expo-stable-diffusion%20in%20my%20app). I will be happy to help!
