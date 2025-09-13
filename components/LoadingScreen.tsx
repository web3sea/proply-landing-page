'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as React from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [showText, setShowText] = React.useState(false);
  const [mountKey] = React.useState(() => Date.now());

  React.useEffect(() => {
    // Reset state on mount
    setShowText(false);

    // Show text after logo animation
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1200);

    // Complete loading animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
        {/* Logo Animation - appears first */}
        <motion.img
          key={`logo-${mountKey}`}
          src="https://cdn.builder.io/api/v1/image/assets%2F7e177c37fa6e47b3b9bfc0025bfe2ce3%2Fa468cc2b6d3c4ce7b7418bd162fd0b02?format=webp&width=800"
          alt="Proply"
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.0,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.3,
          }}
        />

        {/* Brand Name - typing animation */}
        {showText && (
          <motion.div
            key={`text-${mountKey}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="ml-0 sm:ml-4 text-center sm:text-left"
          >
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {"Proply".split("").map((letter, index) => (
                <motion.span
                  key={`typing-${mountKey}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
