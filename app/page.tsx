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
          <section className="relative min-h-screen flex items-center justify-center py-24">
            <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
              <motion.div
                className="flex items-center justify-center mb-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: -8, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <motion.img
                  src="/logo.webp"
                  alt="Proply"
                  className="w-8 h-8 mr-3"
                />
                <span className="text-xl font-semibold text-slate-900">
                  Proply
                </span>
              </motion.div>

              <h1 className="text-4xl font-bold text-slate-900 mb-6">
                Your OS for <br />
                <GradientText
                  className="inline-block font-bold"
                  colors={["#0EA5E9", "#0284C7", "#0EA5E9"]}
                >
                  Property Managers
                </GradientText>
              </h1>

              <div className="flex justify-center">
                <Button
                  className="px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all"
                  style={{
                    background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                  }}
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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
