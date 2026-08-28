"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface WeatherLogoProps {
  size?: number;
}

export default function WeatherLogo({
  size = 58,
}: WeatherLogoProps) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden"
      style={{
        width: size,
        height: size,
      }}
    >
      <DotLottieReact
        src="/animations/Clouds.lottie"
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}