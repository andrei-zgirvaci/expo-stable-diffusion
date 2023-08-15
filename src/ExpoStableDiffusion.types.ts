export type GenerateImageProps = {
  prompt: string;
  stepCount?: number;
  savePath: string;
};

export type StepChangeEvent = {
  step: number;
};
