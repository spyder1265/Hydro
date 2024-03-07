"use client";
import React, { useEffect, useState } from "react";
import { SparklesCore } from "../Animations/ui/sparkles";
import { useTheme } from "@/app/contexts/ThemeContext";

export function SparklesPreview() {
  const { theme, toggleTheme } = useTheme();
  const [particleColor, setParticleColor] = useState<string>(
    theme === "dark"
      ? "#ffffff"
      : theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#ffffff"
      : "#000000"
  );

  useEffect(() => {
    setParticleColor(
      theme === "dark"
        ? "#ffffff"
        : theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#ffffff"
        : "#000000"
    );
  }, [theme]);

  return (
    <div className='h-full relative w-full  flex flex-col items-center justify-center overflow-hidden'>
      <div className='w-full absolute inset-0 h-screen'>
        <SparklesCore
          id='tsparticlesfullpage'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className='w-full h-full'
          colorIsVar
          particleColor={particleColor}
        />
      </div>
      <h1 className='md:text-7xl text-3xl lg:text-6xl font-bold text-center text-neutral-900 dark:text-white relative z-20'>
        Build great products
      </h1>
    </div>
  );
}
