"use client";
import * as React from "react";
import { Slider } from "./slider";
export function SliderDefaultView() {
  const [volume, setVolume] = React.useState(64);
  return (
    <div className="mx-auto w-full max-w-sm rounded-md border p-4">
      <p className="mb-2 text-sm font-medium">Volume</p>
      <Slider value={volume} onChange={(event) => setVolume(Number(event.target.value))} showValue />
    </div>
  );
}
export default SliderDefaultView;
