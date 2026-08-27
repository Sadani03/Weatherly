"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface WeatherLogoProps {
  size?: number;
}

export default function WeatherLogo({
  size = 44,
}: WeatherLogoProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="shrink-0 overflow-hidden"
    >
      <DotLottieReact
        src="/animations/Clouds.lottie"
        loop
        autoplay
      />
    </div>
  );
}