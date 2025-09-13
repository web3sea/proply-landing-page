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
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  Phone,
} from "lucide-react";
import confetti from "canvas-confetti";

interface BetaTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BetaTesterModal({
  isOpen,
  onClose,
}: BetaTesterModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showSurvey, setShowSurvey] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    name?: string;
    company?: string;
    phone?: string;
  }>({});

  const validateForm = () => {
    const errors: {
      email?: string;
      name?: string;
      company?: string;
      phone?: string;
    } = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Name validation
    if (!name.trim()) {
      errors.name = "Full name is required";
    }

    // Company validation
    if (!company.trim()) {
      errors.company = "Company name is required";
    }

    // Phone validation
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const simulateBetaSignup = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success for demo
    return { success: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    // Show survey instead of directly submitting
    setShowSurvey(true);
  };

  const handleSurveyCompletion = async () => {
    setIsLoading(true);

    try {
      await simulateBetaSignup();
      setSuccess(true);

      // Trigger blue confetti animation
      confetti({
        particleCount: 100,
        spread: 80,
        origin: {
          x: 0.5,
          y: 0.6,
        },
        colors: [
          "#0EA5E9", // Blue primary
          "#0284C7", // Blue secondary
          "#0369A1", // Blue darker
          "#38BDF8", // Blue lighter
          "#7DD3FC", // Blue lightest
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle", "square"],
      });

      // User must manually close the modal
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/20 backdrop-blur-md" />
      <DialogContent className="max-w-xs sm:max-w-sm mx-auto p-0 overflow-y-auto max-h-[90vh] bg-white border-0 shadow-2xl animate-in slide-in-from-top-4 duration-300 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-3 sm:p-4">
          {success ? (
            <div className="text-center py-4">
              <DialogTitle className="sr-only">
                Beta Application Success
              </DialogTitle>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Application Submitted!
              </h3>
              <p className="text-sm text-slate-600">
                Beta testing is exclusive and spots are limited. We&apos;ll review
                your application and contact selected candidates within 24-48
                hours.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader className="text-center mb-3">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <img
                    src="/logo.webp"
                    alt="Proply"
                    className="w-12 h-12"
                  />
                  <span className="text-lg font-bold text-slate-900 tracking-tight">
                    Proply
                  </span>
                </div>
                <DialogTitle className="text-lg font-bold text-slate-900">
                  Become a Beta Tester
                </DialogTitle>
                <p className="text-xs text-slate-600 mt-1">
                  Get exclusive early access and help shape the future of AI
                  property management
                </p>
              </DialogHeader>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {!showSurvey ? (
                <>
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="space-y-1">
                      <Label
                        htmlFor="name"
                        className="text-xs text-slate-700 font-medium"
                      >
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                          className={`pl-7 h-8 text-xs ${
                            validationErrors.name
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          }`}
                          disabled={isLoading}
                        />
                      </div>
                      {validationErrors.name && (
                        <p className="text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{validationErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="email"
                        className="text-xs text-slate-700 font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          className={`pl-7 h-8 text-xs ${
                            validationErrors.email
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          }`}
                          disabled={isLoading}
                        />
                      </div>
                      {validationErrors.email && (
                        <p className="text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{validationErrors.email}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="phone"
                        className="text-xs text-slate-700 font-medium"
                      >
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                          className={`pl-7 h-8 text-xs ${
                            validationErrors.phone
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          }`}
                          disabled={isLoading}
                        />
                      </div>
                      {validationErrors.phone && (
                        <p className="text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{validationErrors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="company"
                        className="text-xs text-slate-700 font-medium"
                      >
                        Company Name
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Enter your company name"
                          value={company}
                          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                          className={`pl-7 h-8 text-xs ${
                            validationErrors.company
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          }`}
                          disabled={isLoading}
                        />
                      </div>
                      {validationErrors.company && (
                        <p className="text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{validationErrors.company}</span>
                        </p>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-2 rounded-md">
                      <div className="text-center">
                        <p className="text-xs font-medium text-slate-700 mb-1">
                          Beta Tester Benefits
                        </p>
                        <ul className="text-xs text-slate-600 space-y-0.5">
                          <li>• Free access during beta period</li>
                          <li>• 50% discount on first year after launch</li>
                          <li>• Direct feedback channel to our team</li>
                          <li>• Priority customer support</li>
                        </ul>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full text-white hover:opacity-90 text-xs py-2 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50"
                      style={{
                        background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                      }}
                    >
                      Apply for Beta Access
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </form>

                  <p className="text-xs text-slate-500 text-center mt-2 leading-relaxed">
                    Beta testing spots are limited. We&apos;ll review your
                    application and contact you within 24-48 hours.
                  </p>
                </>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      One More Step!
                    </h3>
                    <p className="text-sm text-slate-600">
                      Please complete this quick 2-minute survey to help us
                      understand your needs better.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-xs text-slate-700 mb-2">
                      📋 This survey will help us tailor your beta testing
                      experience
                    </p>
                    <Button
                      onClick={() =>
                        window.open(
                          "https://form.typeform.com/to/EMKcyYDX",
                          "_blank",
                        )
                      }
                      className="w-full text-white hover:opacity-90 text-xs py-2 rounded-lg shadow-lg transition-all duration-200 mb-2"
                      style={{
                        background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                      }}
                    >
                      Complete Survey
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-600">
                      After completing the survey, click below to finish your
                      application:
                    </p>

                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowSurvey(false)}
                        className="flex-1 text-xs py-2"
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleSurveyCompletion}
                        disabled={isLoading}
                        className="flex-1 text-white hover:opacity-90 text-xs py-2 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50"
                        style={{
                          background:
                            "linear-gradient(135deg, #0EA5E9, #0284C7)",
                        }}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Completing...
                          </>
                        ) : (
                          <>
                            I&apos;ve Completed the Survey
                            <CheckCircle className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
