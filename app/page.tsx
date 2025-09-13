"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import AuthModal from "@/components/AuthModal"
import BetaTesterModal from "@/components/BetaTesterModal"
import { GradientText } from "@/components/ui/gradient-text"
import LoadingScreen from "@/components/LoadingScreen"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Page() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isBetaTesterModalOpen, setIsBetaTesterModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setShowContent(false)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 300)
  }

  // Enhanced typing animation logic
  useEffect(() => {
    if (!showContent) return; // Only run when content is shown

    const text = "Automate your books, save time, and cut costs.";
    const typingElement = document.getElementById("typing-text");
    const cursorElement = document.getElementById("cursor");

    if (!typingElement || !cursorElement) return;

    // Reset content
    typingElement.textContent = "";
    cursorElement.style.display = "inline";
    cursorElement.style.opacity = "1";

    let i = 0;
    const typingSpeed = 40; // Base typing speed

    const typeWriter = () => {
      if (i < text.length) {
        const char = text.charAt(i);
        typingElement.textContent += char;
        i++;

        // Vary typing speed for more natural feel
        let delay = typingSpeed;
        if (char === "," || char === ".") {
          delay = 200; // Pause longer at punctuation
        } else if (char === " ") {
          delay = 60; // Slightly longer pause at spaces
        } else if (Math.random() < 0.1) {
          delay = typingSpeed + Math.random() * 40; // Random variation
        }

        setTimeout(typeWriter, delay);
      } else {
        // Typing finished - pause, then hide cursor
        setTimeout(() => {
          cursorElement.style.transition = "opacity 0.3s ease";
          cursorElement.style.opacity = "0";
          setTimeout(() => {
            cursorElement.style.display = "none";
          }, 300);
        }, 800);
      }
    };

    // Start typing animation after initial delay
    setTimeout(typeWriter, 400);
  }, [showContent]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {showContent && (
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center bg-white py-24">
            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
              {/* Single column centered text */}
              <div className="text-center mx-auto">
                {/** Animated logo - responsive sizes and variant-driven animation tied to showContent */}
                <motion.div
                  className="flex items-center justify-center mb-6"
                  initial="hidden"
                  animate={showContent ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, y: -8, scale: 0.98 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
                >
                  <motion.img
                    src="/logo.webp"
                    alt="Proply"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mr-3"
                    variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.6, delay: 0.18 }}
                  />
                  <motion.span
                    className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold text-slate-900"
                    variants={{ hidden: { opacity: 0, x: 8 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.6, delay: 0.26 }}
                  >
                    {"Proply"}
                  </motion.span>
                </motion.div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 animate-fade-up leading-tight md:leading-tight lg:leading-tight pb-2">
                  Your OS for
                  <br />
                  <GradientText
                    className="inline-block font-bold"
                    colors={["#0EA5E9", "#0284C7", "#0EA5E9"]}
                  >
                    Property Managers
                  </GradientText>
                </h1>

                <div className="mb-6 sm:mb-8 animate-fade-up animate-delay-200 max-w-3xl mx-auto">
                  <p
                    id="typing-text"
                    className="text-xs sm:text-sm md:text-base lg:text-2xl text-slate-600 leading-relaxed mb-3 sm:mb-4"
                  ></p>
                  <span
                    id="cursor"
                    className="inline-block w-0.5 h-3 sm:h-4 md:h-5 lg:h-6 bg-blue-500 animate-pulse"
                  ></span>
                </div>

                <div className="flex justify-center animate-fade-up animate-delay-400">
                  <Button
                    className="px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-base md:text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse-glow"
                    style={{
                      background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                    }}
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Join Waitlist
                    <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </Button>
                </div>

              </div>
            </div>
          </section>

          {/* Modals */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
          <BetaTesterModal
            isOpen={isBetaTesterModalOpen}
            onClose={() => setIsBetaTesterModalOpen(false)}
          />
        </div>
      )}
    </>
  )
}
