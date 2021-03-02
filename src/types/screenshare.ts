export type CustomMediaTrackCapabitilies = MediaTrackCapabilities & {
  brightness?: DoubleRange & { step: number };
};

export type CustomMediaTrackSettings = MediaTrackSettings & {
  brightness?: number;
};
