'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  Building,
} from "lucide-react";
import confetti from "canvas-confetti";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    name?: string;
    company?: string;
  }>({});

  const validateForm = () => {
    const errors: { email?: string; name?: string; company?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = "Email is required";
    else if (!emailRegex.test(email)) errors.email = "Please enter a valid email";

    if (!name.trim()) errors.name = "Full name is required";
    if (!company.trim()) errors.company = "Company name is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWaitlistSignup = async () => {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        name: name.trim(),
        company: company.trim(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to join waitlist");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await handleWaitlistSignup();
      setSuccess(true);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#0EA5E9", "#0284C7", "#0369A1", "#38BDF8", "#7DD3FC"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle", "square"],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/20 backdrop-blur-md" />
      <DialogContent className="max-w-xs sm:max-w-sm mx-auto p-0 overflow-hidden bg-white border-0 shadow-2xl animate-in slide-in-from-top-4 duration-300 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-3 sm:p-4">
          {success ? (
            <div className="text-center py-4">
              <DialogTitle className="sr-only">Waitlist Success</DialogTitle>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                You're on the list!
              </h3>
              <p className="text-sm text-slate-600">
                We'll notify you when Proply is ready for early access.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader className="text-center mb-3">
                <DialogTitle className="text-lg font-bold text-slate-900">
                  Join the Waitlist
                </DialogTitle>
                <p className="text-xs text-slate-600 mt-1">
                  Be among the first to experience AI-powered property management
                </p>
              </DialogHeader>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-7 h-8 text-xs"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.name && (
                    <p className="text-sm text-red-600">{validationErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-7 h-8 text-xs"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-1">
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative">
                    <Building className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                    <Input
                      id="company"
                      type="text"
                      placeholder="Enter your company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="pl-7 h-8 text-xs"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.company && (
                    <p className="text-sm text-red-600">{validationErrors.company}</p>
                  )}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      Joining Waitlist...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
