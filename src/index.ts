import { EventEmitter, Subscription } from "expo-modules-core";

import ExpoStableDiffusionModule from "./ExpoStableDiffusionModule";
import type {
  GenerateImageProps,
  StepChangeEvent,
} from "./ExpoStableDiffusion.types";

const emitter = new EventEmitter(ExpoStableDiffusionModule);

export async function loadModel(modelPath: string) {
  return await ExpoStableDiffusionModule.loadModel(modelPath);
}

export async function generateImage({
  prompt,
  stepCount = 25,
  savePath,
}: GenerateImageProps) {
  return await ExpoStableDiffusionModule.generateImage(
    prompt,
    stepCount,
    savePath
  );
}

export function addStepListener(
  listener: (event: StepChangeEvent) => void
): Subscription {
  return emitter.addListener<StepChangeEvent>("onStepChange", listener);
}
