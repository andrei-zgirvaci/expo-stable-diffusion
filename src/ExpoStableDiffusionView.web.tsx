import * as React from 'react';

import { ExpoStableDiffusionViewProps } from './ExpoStableDiffusion.types';

export default function ExpoStableDiffusionView(props: ExpoStableDiffusionViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
