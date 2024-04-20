import { EventEmitter, Subscription } from 'expo-modules-core';

import type {
  GenerateImageProps,
  StepChangeEvent,
} from './ExpoStableDiffusion.types';
import ExpoStableDiffusionModule from './ExpoStableDiffusionModule';

const emitter = new EventEmitter(ExpoStableDiffusionModule);

export function loadModel(modelPath: string) {
  return ExpoStableDiffusionModule.loadModel(modelPath);
}

export function generateImage({
  prompt,
  stepCount = 25,
  savePath,
}: GenerateImageProps) {
  return ExpoStableDiffusionModule.generateImage(prompt, stepCount, savePath);
}

export function addStepListener(
  listener: (event: StepChangeEvent) => void,
): Subscription {
  return emitter.addListener<StepChangeEvent>('onStepChange', listener);
}
