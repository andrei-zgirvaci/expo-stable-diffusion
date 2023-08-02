import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoStableDiffusionViewProps } from './ExpoStableDiffusion.types';

const NativeView: React.ComponentType<ExpoStableDiffusionViewProps> =
  requireNativeViewManager('ExpoStableDiffusion');

export default function ExpoStableDiffusionView(props: ExpoStableDiffusionViewProps) {
  return <NativeView {...props} />;
}
