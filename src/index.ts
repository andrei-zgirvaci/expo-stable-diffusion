import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoStableDiffusion.web.ts
// and on native platforms to ExpoStableDiffusion.ts
import ExpoStableDiffusionModule from './ExpoStableDiffusionModule';
import ExpoStableDiffusionView from './ExpoStableDiffusionView';
import { ChangeEventPayload, ExpoStableDiffusionViewProps } from './ExpoStableDiffusion.types';

// Get the native constant value.
export const PI = ExpoStableDiffusionModule.PI;

export function hello(): string {
  return ExpoStableDiffusionModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoStableDiffusionModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoStableDiffusionModule ?? NativeModulesProxy.ExpoStableDiffusion);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoStableDiffusionView, ExpoStableDiffusionViewProps, ChangeEventPayload };
