import ExpoStableDiffusionModule from "./ExpoStableDiffusionModule";
import type { GenerateImageProps } from "./ExpoStableDiffusion.types";

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

export function getCurrentStep(): number {
  return ExpoStableDiffusionModule.getCurrentStep();
}
